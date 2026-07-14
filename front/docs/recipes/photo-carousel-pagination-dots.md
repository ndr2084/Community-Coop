# Recipe: Single-photo carousel with pagination dots and prev/next arrows

## What this covers

Given an item with multiple photo URLs (`item.picture: string[]`, see
[multi-file-upload-reactive-forms.md](./multi-file-upload-reactive-forms.md)),
show exactly one photo at a time inside the existing `.shop-item` card, with
small circular dots below the photo indicating position, and left/right
arrow buttons overlaid on the photo itself for stepping one at a time.
Clicking a dot jumps straight to that photo; clicking an arrow moves one
photo forward/back (wrapping around at either end).

## The key architectural decision: make it its own component

`user-shop.html` renders one `.shop-item` div per item via `@for`. Each of
those cards needs its **own independent "which photo am I on" state** — item
A being on photo 2 must not affect item B.

Don't track this with something like `Map<itemId, number>` in `UserShop`.
That works but scales badly and mixes carousel bookkeeping into a component
that shouldn't care about it. Instead, extract a standalone
`UserItemCarousel` component. Angular gives every embedded component
instance its own state for free — one `currentIndex` signal per instance,
no manual keying required.

## The component

`page-components/user-item-carousel/user-item-carousel.ts`:

```ts
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-item-carousel',
  imports: [],
  templateUrl: './user-item-carousel.html',
  styleUrl: './user-item-carousel.css',
})
export class UserItemCarousel {
  photos = input<string[]>([]);
  currentIndex = signal(0);

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  prev(): void {
    const count = this.photos().length;
    this.currentIndex.update(i => (i - 1 + count) % count);
  }

  next(): void {
    const count = this.photos().length;
    this.currentIndex.update(i => (i + 1) % count);
  }
}
```

The `% count` wraparound math is why `prev()` adds `count` before the modulo
— JavaScript's `%` can return a negative result (`-1 % 3 === -1`), which
would produce an invalid array index. `(i - 1 + count) % count` keeps the
result in `[0, count - 1]`.

`page-components/user-item-carousel/user-item-carousel.html`:

```html
<div class="carousel">
  @if (photos().length) {
    <div class="carousel-photo-wrapper">
      @if (photos().length > 1) {
        <button
          type="button"
          class="nav-arrow prev"
          aria-label="Previous photo"
          (click)="prev()">
          &#10094;
        </button>
      }

      <img
        [src]="photos()[currentIndex()]"
        alt="item photo"
        class="carousel-photo">

      @if (photos().length > 1) {
        <button
          type="button"
          class="nav-arrow next"
          aria-label="Next photo"
          (click)="next()">
          &#10095;
        </button>
      }
    </div>
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

`page-components/user-item-carousel/user-item-carousel.css`:

```css
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.carousel-photo-wrapper {
  position: relative;
  width: 350px;
}

.carousel-photo {
  width: 350px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 1;
  cursor: pointer;
}

.nav-arrow.prev {
  left: 8px;
}

.nav-arrow.next {
  right: 8px;
}

.carousel-dots {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.dot {
  width: 16px;
  height: 16px;
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

```html
<div class="shop-item">
  <app-user-item-carousel [photos]="item.picture"></app-user-item-carousel>
  <p>Name: {{item.name}}</p>
  <p>Description: {{item.description}}</p>
  <p>price: {{item.price}}</p>
  <p>is for rent: {{item.isForRent}}</p>
  <p>is for sale: {{item.isForSale}}</p>
  <p>condition: {{item.condition}}</p>
</div>
```

Add `UserItemCarousel` to `UserShop`'s `imports: [...]` array.

## Why "only one photo visible" is easy here

Only one `<img>` is ever rendered in the DOM at a time —
`photos()[currentIndex()]` picks a single URL. There's no sliding track to
clip with `overflow: hidden`; switching photos just swaps which URL the one
`<img>` points at. "Boundary = `.shop-item`" is handled by sizing the image
to the card rather than letting it render at native resolution and overflow
the card.

If you later want an animated slide-between-photos effect instead of an
instant swap, that requires a different approach: render all photos in a
flex row inside an `overflow: hidden` track and translate the track by
`-100% * currentIndex`. That's a separate recipe — the instant-swap version
above satisfies "only 1 photo visible at a time" without needing it.

## Why the arrows need `position: relative` on the wrapper

The arrows are positioned with `position: absolute`, which places them
relative to the nearest ancestor that has `position: relative` (or another
non-static value). That's the whole reason `.carousel-photo-wrapper` exists
as its own element instead of putting the arrows as siblings of `.carousel`
— without that wrapper, the arrows would position relative to some further-
out ancestor (or the viewport) instead of hugging the photo's edges.

## Dots and arrows share one source of truth

Both controls call methods on the same `currentIndex` signal (`goTo`,
`prev`, `next`). There's no separate state to keep in sync — clicking an
arrow updates `currentIndex`, and the dots re-render from that same signal
on the next change-detection pass, so the active dot always matches
whichever photo the arrows navigated to.

## Edge cases handled

- **0 photos:** the `@if (photos().length)` guard skips rendering the photo
  wrapper (and therefore the arrows) entirely.
- **1 photo:** both the dots and the arrows are hidden
  (`@if (photos().length > 1)`) since navigation is meaningless with only
  one photo.
- **Wraparound:** `prev()` from index 0 goes to the last photo; `next()`
  from the last index goes back to 0 — no dead ends at either boundary.
- **Accessibility:** all controls are real `<button>` elements
  (keyboard-focusable, `Enter`/`Space` activate them for free) with
  `aria-label`, and the dots additionally carry `aria-current` so screen
  readers announce position.

## Checklist

- [ ] Carousel state (`currentIndex`) lives inside a dedicated child
      component, not keyed by item ID in the parent
- [ ] Only one `<img>` renders at a time, sized to fill its container
- [ ] Photo `<img>` is wrapped in a `position: relative` container so the
      arrows can be absolutely positioned against it
- [ ] `prev()`/`next()` wrap around using `(i ± 1 + count) % count`
- [ ] Dots and arrows are hidden when there's only one (or zero) photos
- [ ] All controls are `<button>` elements with `aria-label` /
      `aria-current`
- [ ] Icon-only buttons (e.g. the `❮`/`❯` glyphs) have `text-align: center`
      — a `<button>` is inline content by default and won't self-center a
      text/glyph child just from setting `width`/`height`
- [ ] Clicking a dot calls `goTo(i)` and jumps directly to that photo
