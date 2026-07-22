import { Component, inject, viewChildren, ElementRef, afterRenderEffect } from '@angular/core';
import { UserIndexService } from '../../../services/user-index-service';
import { UserShopService } from '../../../services/user-shop-service';
import { Dialog } from '@angular/cdk/dialog';
import { UserShopItemCreation } from '../forms/user-shop-item-creation/user-shop-item-creation';
import { Panel } from "../panel/panel";

@Component({
  selector: 'app-gallery',
  imports: [Panel],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {

  //SCROLLING
  left_scroll = document.querySelector(".left");
  right_scroll = document.querySelector(".right");


  //SERVICES
  index = inject(UserIndexService);
  userShopService = inject(UserShopService);


  //EXTERNAL VARIABLES
  readonly itemList = this.userShopService.items();

  //MASONRY LAYOUT
  // must match `grid-auto-rows` / `gap` on app-gallery in user-shop.css
  private static readonly ROW_UNIT = 1;
  private static readonly ROW_GAP = 8;

  private readonly shopItemEls = viewChildren<ElementRef<HTMLElement>>('shopItemEl');

  constructor() {
    afterRenderEffect((onCleanup) => {
      const elements = this.shopItemEls().map((ref) => ref.nativeElement);

      const observers = elements.map((el) => {
        const observer = new ResizeObserver(() => this.applySpan(el));
        observer.observe(el);
        this.applySpan(el);
        return observer;
      });

      onCleanup(() => observers.forEach((observer) => observer.disconnect()));
    });
  }

  private applySpan(el: HTMLElement) {
    const height = el.getBoundingClientRect().height;
    const span = Math.ceil(
      (height + Gallery.ROW_GAP) / (Gallery.ROW_UNIT + Gallery.ROW_GAP)
    );
    el.style.gridRowEnd = `span ${span}`;
  }

  //CAROUSEL FUNCITONALITY

  slideIndex: number = 1;
  slide = document.querySelectorAll("slide-container");

  scrollLeft(n: number){
    console.log(this.slide);
  };
  scrollRight(n: number){
    this.right_scroll?.scrollTo({left: -325, behavior: 'smooth'})
  };
}
