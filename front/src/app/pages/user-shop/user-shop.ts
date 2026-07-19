import { Component, inject } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { UserIndexService } from '../../services/user-index-service';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog'
import { UserShopItemCreation } from './forms/user-shop-item-creation/user-shop-item-creation';
import { UserShopService } from '../../services/user-shop-service';

@Component({
  selector: 'app-user-shop',
  imports: [Header, DialogModule],
  templateUrl: './user-shop.html',
  styleUrl: './user-shop.css',
})
export class UserShop {

  //SCROLLING
  left_scroll = document.querySelector(".left");
  right_scroll = document.querySelector(".right");


  //SERVICES
  index = inject(UserIndexService);
  userShopService = inject(UserShopService);


  //EXTERNAL VARIABLES
  readonly itemList = this.userShopService.items();
  private dialog = inject(Dialog)

  addItem(){
    const dialogRef =
    this.dialog.open(UserShopItemCreation, {
      width: '350px',
      data: {
        title: 'Add Item',
        messge: 'Adding item for sale!',
        itemId: 0
      }
    })

    dialogRef.closed.subscribe(result => {
      if (result === 'confirmed'){
        console.log('User confirmed the action')
      }
  })
  };


  removeItem(){};
  editItem(){};
  viewShop(){};

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
