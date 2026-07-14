import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserShopService } from '../../../services/user-shop-service';

@Component({
  selector: 'app-user-shop-item-creation',
  imports: [ReactiveFormsModule],
  templateUrl: './user-shop-item-creation.html',
  styleUrl: './user-shop-item-creation.css',
})
export class UserShopItemCreation {

  dialogRef = inject(DialogRef);
  userShopService = inject(UserShopService);
  files: File[] = [];
  imageUrls: string[] = [];

  close() {
    this.dialogRef.close()
  }

  confirm() {
    this.submitApplication();
    for(const f of this.files){
      console.log("photo:", f);
    }

    this.dialogRef.close('confirmed')
  }

  /*Assigns form values to variables*/
  itemForm = new FormGroup({
    name : new FormControl(''),
    price: new FormControl(),
    isForRent: new FormControl(false),
    isForSale : new FormControl(false),
    condition : new FormControl(''),
    picture : new FormControl<string[]>([]),
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
      this.itemForm.value.picture ?? [],
      this.itemForm.value.description ?? '',
    )
  }

  onFileSelect(e: Event){
    this.files = Array.from((e.target as HTMLInputElement).files ?? []);
    this.itemForm.patchValue({
      picture: this.files.map(file => URL.createObjectURL(file)),
    });
  }
}
