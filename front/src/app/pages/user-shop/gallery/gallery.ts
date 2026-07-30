import { Component, inject } from '@angular/core';
import { UserIndexService } from '../../../services/user-index-service';
import { UserShopService } from '../../../services/user-shop-service';
import { Dialog } from '@angular/cdk/dialog';
import { UserShopItemCreation } from '../forms/user-shop-item-creation/user-shop-item-creation';
import { Panel } from "../panel/panel";
import { PhotoModal } from './photo-modal/photo-modal';


@Component({
  selector: 'app-gallery',
  imports: [Panel],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {


  //SERVICES
  userShopService = inject(UserShopService);


  //EXTERNAL VARIABLES
  readonly itemList = this.userShopService.items();


  //open modal
  dialog = inject(Dialog);

  openDialog(index: number): void {
    this.userShopService.setCurrentIndex(index);
    this.dialog.open<string>(PhotoModal, {
      disableClose: true,
      height: '100%',
      width: '100%',
    });
  }
}
