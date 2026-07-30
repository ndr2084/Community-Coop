import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

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
}
