import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './location-modal.html',
  styleUrl: './location-modal.css',
})
export class LocationModal {

  protected locationForm = new FormGroup<LocationForm>({
    postalCode: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    })

  })

  private dialogRef = inject(DialogRef,
    {
      optional: true,
    });
  protected closeModal() {
    this.dialogRef?.close();
  }

  submitForm() { }
}

export interface LocationForm {
  postalCode: string | any
}
