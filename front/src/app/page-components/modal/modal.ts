import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserShopService } from '../../services/user-shop-service';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {

  dialogRef = inject(DialogRef);
  userShopService = inject(UserShopService);

  close() {
    this.dialogRef.close()
  }

  confirm() {
    this.dialogRef.close('confirmed')
  }

  /*Assigns form values to variables*/
  itemForm = new FormGroup({
    name : new FormControl(''),
    price: new FormControl(-999),
    isForRent: new FormControl(false),
    isForSale : new FormControl(false),
    condition : new FormControl(''),
    picture : new FormControl(''),
    description : new FormControl(''),
  });

  submitApplication(){
    console.log("submitApplication fxn reached");
    this.userShopService.create(
      this.itemForm.value.name ?? '',
      this.itemForm.value.price ?? 0,
      this.itemForm.value.isForRent ?? false,
      this.itemForm.value.isForSale ?? false,
      this.itemForm.value.condition ?? '',
      this.itemForm.value.picture ?? '',
      this.itemForm.value.description ?? '',
    )
  }



}
