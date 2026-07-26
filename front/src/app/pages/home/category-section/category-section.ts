import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-section',
  imports: [ReactiveFormsModule],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {

  searchCategory = new FormGroup({
    category : new FormControl('')
  });

}
