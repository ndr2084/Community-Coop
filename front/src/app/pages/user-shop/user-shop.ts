import { Component, inject } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { UserIndexService } from '../../services/user-index-service';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog'
import { Modal } from '../../page-components/modal/modal';
import { UserShopService } from '../../services/user-shop-service';

@Component({
  selector: 'app-user-shop',
  imports: [Header, DialogModule],
  templateUrl: './user-shop.html',
  styleUrl: './user-shop.css',
})
export class UserShop {

  index = inject(UserIndexService);
  userShopService = inject(UserShopService);
  readonly itemList = this.userShopService.items();

  private dialog = inject(Dialog)

  addItem(){
    const dialogRef =
    this.dialog.open(Modal, {
      width: '500px',
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


}
