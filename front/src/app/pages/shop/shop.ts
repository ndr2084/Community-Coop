import { Component } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { CheckboxForm } from "./category-picker/checkbox-form/checkbox-form";
import { CategoryGridLayout } from "./category-grid-layout/category-grid-layout";
import { CategoryPicker } from "./category-picker/category-picker";
import { Footer } from "../../page-components/footer/footer";

@Component({
  selector: 'app-shop',
  imports: [Header, CheckboxForm, CategoryGridLayout, CategoryPicker, Footer],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {

}
