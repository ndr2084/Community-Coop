import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIndexService } from '../../services/user-index-service';
import { Dialog } from '@angular/cdk/dialog';
import { LocationModal } from '../location-modal/location-modal';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  router = inject(Router);
  index = inject(UserIndexService)
  private dialog = inject(Dialog);
  protected openModal(){
    this.dialog.open(LocationModal, {
      disableClose: true,
      height: '100%',
      width: '100%',
    } );
  }

  returnToHome(){
    this.router.navigateByUrl("home");
  }

  chooseShoppingLocation(){
    this.router.navigateByUrl("user-shop")
  }

  viewOrderHistory(){
    this.router.navigateByUrl("order-history")
  }

  viewCart(){
    this.router.navigateByUrl("cart")
  }
}
