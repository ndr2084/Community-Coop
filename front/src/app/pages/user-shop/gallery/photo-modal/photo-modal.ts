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
  private dialogRef = inject(DialogRef,
    {
      optional: true,
    });
  protected closeModal() {
    this.dialogRef?.close();
  }

  userShopService = inject(UserShopService);

  readonly itemList = this.userShopService.items();
  itemIndex = this.userShopService.getCurrentIndex();
}
