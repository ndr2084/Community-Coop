import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { UserShopService } from '../../../../services/user-shop-service';

@Component({
  selector: 'app-photo-modal',
  imports: [],
  templateUrl: './photo-modal.html',
  styleUrl: './photo-modal.css',
})
export class PhotoModal {

  //CAROUSEL TRACK LOGIC
  userShopService = inject(UserShopService);
  readonly itemList = this.userShopService.items();
  readonly itemListLength = this.itemList.length;
  itemIndex = this.userShopService.getCurrentIndex();
  carouselLength = this.itemList()[this.itemIndex].picture.length;
  index = 0;


  private go(step: number) {
    console.log(`carousel length:` + this.carouselLength);
    this.index = (this.index + step + this.carouselLength) % this.carouselLength;
    this.currentIndex();
    console.log(`current index:` + this.index)

  }

  prev() {
    return this.go(-1);
  }

  next() {
    return this.go(1);
  }

  computedSlide() {
    return `translateX(-${this.index * 100}%)`;
  }

  currentIndex() {
    console.log("current step" + this.index);
    return this.index;
  }

  //MODAL LOGIC
  private dialogRef = inject(DialogRef,
    {
      optional: true,
    });
  protected closeModal() {
    this.dialogRef?.close();
  }
}





