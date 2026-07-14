# Recipe: Multi-file upload with Angular Reactive Forms

## The core problem

`<input type="file">` is **not** a normal form control — `formControlName`
silently binds the wrong data instead of erroring. Full explanation of why:
[footguns.md § Angular Reactive Forms: `formControlName` on `<input type="file">`](../footguns.md#angular-reactive-forms-formcontrolname-on-input-typefile).

Short version: browsers refuse to let JavaScript read or set a file input's
real value, so `formControlName="pictures"` on `<input type="file" multiple>`
never produces real `File` data, no matter what.

## The fix: bypass the value accessor, wire it manually

Don't bind the file input through `formControlName`. Instead, read the files
off the native `change` event and push them into the form yourself.

```html
<input
  type="file"
  accept="image/*"
  multiple
  (change)="onFilesSelected($event)">
```

```ts
onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const files = input.files ? Array.from(input.files) : [];

  // Keep the raw File objects around for actual upload later
  this.selectedFiles = files;

  // If you just need something to preview/display, convert to blob URLs
  this.itemForm.patchValue({
    pictures: files.map(f => URL.createObjectURL(f)),
  });
}
```

```ts
itemForm = new FormGroup({
  // seed with [] so the type lines up with string[] everywhere else
  pictures: new FormControl<string[]>([]),
});

selectedFiles: File[] = [];
```

## Footgun: mutating `itemForm.value` directly

Don't write into the form via `this.itemForm.value.pictures = [...]` — it
appears to work, then silently breaks the moment the user touches any other
field in the form, and TypeScript won't warn you either way. Full
explanation, why the compiler can't catch it, and the fix:
[footguns.md § Angular Reactive Forms: mutating `.value` directly](../footguns.md#angular-reactive-forms-mutating-value-directly).

Short version: always update controls via `patchValue()`/`setValue()`,
never by assigning into `.value`.

## Displaying the uploaded images

Iterate the array field directly — not the parent list again.

```html
@for (item of itemList(); track item.id) {
  <div class="shop-item">
    @for (picture of item.pictures; track picture) {
      <img [src]="picture" alt="item photo">
    }
  </div>
}
```

Common mistake: looping over the outer list a second time instead of the
per-item array, e.g. `@for (picture of itemList(); track picture)` — this
iterates the wrong collection and every `picture` variable goes unused.

## Two different "values" — don't conflate them

`URL.createObjectURL(file)` gives you a `blob:` URL that's only valid in the
current browser tab/session. It's great for instant `<img>` previews, but:

- **It is not persisted data.** Refreshing the page invalidates it.
- **It cannot be sent to a backend as-is.** A server can't fetch a
  `blob:http://localhost/...` URL — that URL only resolves inside the tab
  that created it.

So keep two things distinct:
1. `string[]` of object URLs → for immediate UI preview only.
2. `File[]` (raw, e.g. `selectedFiles` above) → for the actual upload.

When you're ready to actually upload, send the raw `File[]` via `FormData`,
not the preview strings:

```ts
submit() {
  const formData = new FormData();
  this.selectedFiles.forEach(file => formData.append('pictures', file));
  // ...append other fields, then http.post(url, formData)
}
```

## Cleanup (avoid leaking memory)

Each `URL.createObjectURL(file)` call allocates a reference that stays alive
until you explicitly revoke it or the document unloads. If items/previews get
replaced or removed (e.g. user re-selects files, or a dialog closes/reopens
repeatedly), revoke the old URLs:

```ts
oldUrls.forEach(url => URL.revokeObjectURL(url));
```

## Checklist

- [ ] Remove `formControlName` from the file `<input>`; use `(change)` instead
- [ ] Add `multiple` and (usually) `accept="image/*"` to the input
- [ ] Convert `FileList` → `File[]` with `Array.from(input.files ?? [])`
- [ ] Update the form via `patchValue()`/`setValue()` — never assign into
      `itemForm.value` directly, it gets silently overwritten
- [ ] Keep raw `File[]` separately if you'll actually upload them
- [ ] Use `URL.createObjectURL(file)` only for preview strings
- [ ] Loop over the *item's* array field when displaying, not the parent list
- [ ] Revoke object URLs when they're no longer needed
