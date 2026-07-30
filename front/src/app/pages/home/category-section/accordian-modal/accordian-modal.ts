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
  items = ['Climbing Gear', 'Camping & Tents', 'Sleeping Bags & Pads', 'Backpacks & Bags', 'Camp Kitchen & Cookware'];
  expandedIndex = 0;

  dialogRef = inject(DialogRef,{
    optional: true
  });

  close() {
    this.dialogRef?.close();
  }
}
