import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AccordianModal } from './accordian-modal/accordian-modal';

@Component({
  selector: 'app-category-section',
  imports: [ReactiveFormsModule],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {

  dialog = inject(Dialog);

  openModal(){
    this.dialog.open(AccordianModal, {
      disableClose: true,
      height: '100%',
      width: '100%'
    })
  }

}
