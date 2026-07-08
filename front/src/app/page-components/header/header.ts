import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIndexService } from '../../services/user-index-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  router = inject(Router);
  index = inject(UserIndexService)

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
