# Recipe: Multi-file upload with Angular Reactive Forms

## The core problem

`<input type="file">` is **not** a normal form control. Browsers refuse to let
JavaScript set or read a file input's real value for security reasons. That
means:

- You cannot pre-fill a file input's value programmatically.
- `formControlName="x"` on a file input does **not** give you the selected
  `File` objects. Angular's default value accessor listens for `change` and
  writes back `element.value`, which for a file input is just a fake string
  like `"C:\fakepath\photo.jpg"` — a single string, even with `multiple` set.

So any pattern like this is broken, regardless of `multiple`:

```html
<!-- BROKEN: never produces real File data -->
<input type="file" formControlName="pictures" multiple>
```

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
- [ ] Keep raw `File[]` separately if you'll actually upload them
- [ ] Use `URL.createObjectURL(file)` only for preview strings
- [ ] Loop over the *item's* array field when displaying, not the parent list
- [ ] Revoke object URLs when they're no longer needed
