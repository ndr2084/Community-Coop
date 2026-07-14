import { Component, computed, input, signal } from '@angular/core';

const PHOTO_WIDTH = 260;
const PHOTO_GAP = 12;
const ITEM_WIDTH = PHOTO_WIDTH + PHOTO_GAP;
const VIEWPORT_WIDTH = 350;

@Component({
  selector: 'app-user-item-carousel',
  imports: [],
  templateUrl: './user-item-carousel.html',
  styleUrl: './user-item-carousel.css',
})
export class UserItemCarousel {
  photos = input<string[]>([]);
  currentIndex = signal(0);

  hasPrev = computed(() => this.currentIndex() > 0);
  hasNext = computed(() => this.currentIndex() < this.photos().length - 1);

  // Shifts the track so the current photo's center always lands on the
  // viewport's center, regardless of how many neighbors exist either side.
  trackOffset = computed(() => {
    const centerOffset = (VIEWPORT_WIDTH - PHOTO_WIDTH) / 2;
    return centerOffset - this.currentIndex() * ITEM_WIDTH;
  });

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  prev(): void {
    if (this.hasPrev()) {
      this.currentIndex.update(i => i - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.currentIndex.update(i => i + 1);
    }
  }
}
