import { Component, inject } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-accordian-modal',
  imports: [CdkAccordionModule],
  templateUrl: './accordian-modal.html',
  styleUrl: './accordian-modal.css',
})
export class AccordianModal {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  dialogRef = inject(DialogRef,{
    optional: true
  });

  close() {
    this.dialogRef?.close();
  }
}
