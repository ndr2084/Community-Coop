import { Component, inject } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { UserIndexService } from '../../services/user-index-service';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog'
import { UserShopItemCreation } from './forms/user-shop-item-creation/user-shop-item-creation';
import { UserShopService } from '../../services/user-shop-service';
import { Gallery } from "./gallery/gallery";
import { Panel } from "./panel/panel";

@Component({
  selector: 'app-user-shop',
  imports: [Header, DialogModule, Gallery, Panel],
  templateUrl: './user-shop.html',
  styleUrl: './user-shop.css',
})
export class UserShop {

}
