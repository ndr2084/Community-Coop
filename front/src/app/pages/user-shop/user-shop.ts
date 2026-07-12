import { Component, inject } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { UserIndexService } from '../../services/user-index-service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-user-shop',
  imports: [Header],
  templateUrl: './user-shop.html',
  styleUrl: './user-shop.css',
})
export class UserShop {

  index = inject(UserIndexService);
  private dialog = inject(Dialog)

  addItem(){

  };
  removeItem(){};
  editItem(){};
  viewShop(){};


}
