# Footguns

Cross-cutting bugs that are easy to write, compile cleanly, and only fail at
runtime — often well after the code that caused them. Each entry says what
the broken pattern looks like, why it passes the compiler, the fix, and how
far the underlying rule generalizes. Recipes that hit one of these link back
here instead of repeating the explanation inline.

## Angular Reactive Forms: `formControlName` on `<input type="file">`

**Hit in:** [recipes/multi-file-upload-reactive-forms.md](recipes/multi-file-upload-reactive-forms.md)

It looks consistent to wire a file input the same way as every other field
in the form:

```html
<!-- BROKEN: never produces real File data -->
<input type="file" formControlName="pictures" multiple>
```

This one isn't even an Angular-specific mistake — the browser itself
refuses to let JavaScript read or set the real value of a file input, for
security reasons. That's true in vanilla JS, with or without a framework.

**Why `formControlName` specifically breaks here:** it relies on Angular's
default `ControlValueAccessor`, which listens for the native
`change`/`input` event and writes `element.value` back into the
`FormControl`. For every other input type, `.value` genuinely is the data
(text, number, checkbox, range — which is exactly why `formControlName`
works for the rest of the fields in the same form). For a file input,
`.value` is never the selected files — it's a fake placeholder string like
`"C:\fakepath\photo.jpg"`, and even with `multiple` set, it's still just
that one string, never a list. So `formControlName` doesn't error, doesn't
warn, and doesn't throw — it just silently binds the wrong data.

**Fix:** don't route file selection through the value accessor at all.
Read the real data straight off the DOM event instead:

```html
<input type="file" (change)="onFileSelect($event)" multiple>
```

```ts
onFileSelect(event: Event): void {
  const files = Array.from((event.target as HTMLInputElement).files ?? []);
  // ... build File[]/preview URLs, then patchValue() into the form —
  // see the "mutating .value directly" footgun below for how *not* to do that part.
}
```

`event.target.files` is a real `FileList` of the actual selected files —
that's the only place the real data ever exists. Whatever you do with it
afterward (store the raw `File[]`, generate preview URLs, etc.) has to be
wired into the form manually, because the file input itself can never be
the thing driving the control the way it does for text/number/checkbox
inputs.

**How far this generalizes:** any native element where the browser
restricts JS access to the "real" value for security or platform reasons
(file inputs, `<input type="password">`'s autofill value in some
contexts, clipboard-derived values) can't be trusted to a generic
value-accessor binding. When in doubt, check what `.value` actually
contains for that element type before wiring it through `formControlName`.

## Angular Reactive Forms: mutating `.value` directly

**Hit in:** [recipes/multi-file-upload-reactive-forms.md](recipes/multi-file-upload-reactive-forms.md)

It's tempting to just assign into the value object a `FormGroup` gives you
back:

```ts
// BROKEN — looks like it works, then silently breaks
onFilesSelected(event: Event): void {
  const files = Array.from((event.target as HTMLInputElement).files ?? []);
  this.itemForm.value.pictures = files.map(f => URL.createObjectURL(f));
}
```

This appears to work immediately, then the value vanishes as soon as the
user touches *any other field* in the form. Here's why:

`itemForm.value` is not a plain object you own — it's a snapshot Angular
rebuilds from the group's actual child controls every time any control in
the group changes (`_updateValue()` runs on every `setValue()`/`patchValue()`/
input event). Mutating that snapshot directly only edits the *current*
snapshot object; it never touches the real `pictures` `FormControl`. The
instant another field changes, Angular reconstructs `.value` from the real
controls — and the `pictures` control's real value was never updated, so
your manually-assigned data gets overwritten with whatever it actually held
(usually the control's initial value).

**The compiler won't catch this for you.** Angular's typed reactive forms
mark `.value` `readonly` at the top level, so `this.itemForm.value = {...}`
is a compile error — but that's a *shallow* readonly. It doesn't stop you
from reaching into the returned object and mutating one of its properties
(`this.itemForm.value.pictures = [...]`), because TypeScript's `readonly`
doesn't propagate into nested properties. There's no red squiggly here; you
only find out at runtime, and only once you happen to touch another field.

**Fix:** go through `patchValue()` (or `setValue()`) so the actual control
gets updated, not just the derived snapshot:

```ts
onFilesSelected(event: Event): void {
  const files = Array.from((event.target as HTMLInputElement).files ?? []);
  this.itemForm.patchValue({
    pictures: files.map(f => URL.createObjectURL(f)),
  });
}
```

`patchValue({ pictures: [...] })` updates just the keys you pass and leaves
the rest of the group alone — use this for single-field updates like this
one. `setValue({...})` requires a value for *every* control in the group
(throws if you omit one) — reach for it only when initializing or resetting
the whole form at once.

**Scope this rule correctly.** It only applies to values that live inside a
`FormGroup`/`FormControl`. A plain component property that isn't wired into
the form — e.g. a `selectedFiles: File[]` field you keep alongside the form
purely for later upload — is ordinary component state, and ordinary
assignment is exactly correct for it. The rule isn't "never assign to a
property," it's "never assign into a reactive framework's read-facing
snapshot instead of its write API."

**How far this generalizes:** the same principle holds for any
reactive-state system — Angular/React signals, NgRx/Redux selectors,
`useState` — a `.value`/`.getValue()`-style getter is always a snapshot; the
write path is always a separate, differently-named function (`setValue`,
`.set()`, `dispatch()`, the state setter). If you're assigning into
something that came from a read accessor like that, stop and find the real
write API instead.
