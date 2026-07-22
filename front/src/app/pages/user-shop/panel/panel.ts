import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { UserShopItemCreation } from '../forms/user-shop-item-creation/user-shop-item-creation';
import { Header } from "../../../page-components/header/header";

@Component({
  selector: 'app-panel',
  imports: [Header],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
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
}
