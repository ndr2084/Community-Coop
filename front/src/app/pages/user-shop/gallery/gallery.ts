import { Component, inject } from '@angular/core';
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
