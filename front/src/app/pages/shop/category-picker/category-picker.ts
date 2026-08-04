import { Component } from '@angular/core';
import { CheckboxForm } from "./checkbox-form/checkbox-form";
import { CategoryGridLayout } from "../category-grid-layout/category-grid-layout";

@Component({
  selector: 'app-category-picker',
  imports: [CheckboxForm, CategoryGridLayout],
  templateUrl: './category-picker.html',
  styleUrl: './category-picker.css',
})
export class CategoryPicker {

}
