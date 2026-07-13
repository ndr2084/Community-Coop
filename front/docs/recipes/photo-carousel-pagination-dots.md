# Recipe: Single-photo carousel with pagination dots

## What this covers

Given an item with multiple photo URLs (`item.picture: string[]`, see
[multi-file-upload-reactive-forms.md](./multi-file-upload-reactive-forms.md)),
show exactly one photo at a time inside the existing `.shop-item` card, with
small circular dots below the photo indicating position — clicking a dot
jumps straight to that photo.

## The key architectural decision: make it its own component

`user-shop.html` renders one `.shop-item` div per item via `@for`. Each of
those cards needs its **own independent "which photo am I on" state** — item
A being on photo 2 must not affect item B.

Don't track this with something like `Map<itemId, number>` in `UserShop`.
That works but scales badly and mixes carousel bookkeeping into a component
that shouldn't care about it. Instead, extract a standalone `PhotoCarousel`
component. Angular gives every embedded component instance its own state for
free — one `currentIndex` signal per instance, no manual keying required.

## The component

`page-components/photo-carousel/photo-carousel.ts`:

```ts
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-photo-carousel',
  imports: [],
  templateUrl: './photo-carousel.html',
  styleUrl: './photo-carousel.css',
})
export class PhotoCarousel {
  photos = input<string[]>([]);
  currentIndex = signal(0);

  goTo(index: number): void {
    this.currentIndex.set(index);
  }
}
```

`page-components/photo-carousel/photo-carousel.html`:

```html
<div class="carousel">
  @if (photos().length) {
    <img
      [src]="photos()[currentIndex()]"
      alt="item photo"
      class="carousel-photo">
  }

  @if (photos().length > 1) {
    <div class="carousel-dots">
      @for (photo of photos(); track $index; let i = $index) {
        <button
          type="button"
          class="dot"
          [class.active]="i === currentIndex()"
          [attr.aria-current]="i === currentIndex()"
          [attr.aria-label]="'Go to photo ' + (i + 1)"
          (click)="goTo(i)">
        </button>
      }
    </div>
  }
</div>
```

`page-components/photo-carousel/photo-carousel.css`:

```css
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.carousel-photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.carousel-dots {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
}

.dot.active {
  background: #333;
}
```

## Wiring it into `user-shop.html`

Replace the raw `@for` over `item.picture` with the carousel component:

```html
<div class="shop-item">
  <p>Name: {{item.name}}</p>
  <p>Description: {{item.description}}</p>
  <p>price: {{item.price}}</p>
  <p>is for rent: {{item.isForRent}}</p>
  <p>is for sale: {{item.isForSale}}</p>
  <p>condition: {{item.condition}}</p>
  <app-photo-carousel [photos]="item.picture" />
</div>
```

Add `PhotoCarousel` to `UserShop`'s `imports: [...]` array.

## Why "only one photo visible" is easy here

Only one `<img>` is ever rendered in the DOM at a time —
`photos()[currentIndex()]` picks a single URL. There's no sliding track to
clip with `overflow: hidden`; switching photos just swaps which URL the one
`<img>` points at. "Boundary = `.shop-item`" is handled by sizing the image
to the card (`width: 100%` + `object-fit: cover`) rather than letting it
render at native resolution and overflow the card.

If you later want an animated slide-between-photos effect instead of an
instant swap, that requires a different approach: render all photos in a
flex row inside an `overflow: hidden` track and translate the track by
`-100% * currentIndex`. That's a separate recipe — the instant-swap version
above satisfies "only 1 photo visible at a time" without needing it.

## Edge cases handled

- **0 photos:** the `@if (photos().length)` guard skips rendering an `<img>`
  with an empty/undefined `src`.
- **1 photo:** the dots are hidden (`@if (photos().length > 1)`) since
  pagination is meaningless for a single photo.
- **Accessibility:** dots are real `<button>` elements (keyboard-focusable,
  `Enter`/`Space` activate them for free) with `aria-label` and
  `aria-current` so screen readers announce position.

## Checklist

- [ ] Carousel state (`currentIndex`) lives inside a dedicated child
      component, not keyed by item ID in the parent
- [ ] Only one `<img>` renders at a time, sized to fill its container
- [ ] Dots only render when there's more than one photo
- [ ] Dots are `<button>` elements with `aria-label` / `aria-current`
- [ ] Clicking a dot calls `goTo(i)` and jumps directly to that photo
