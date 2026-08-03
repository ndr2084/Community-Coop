import { Component } from '@angular/core';
import { Header } from "../../page-components/header/header";
import { CheckboxForm } from "./checkbox-form/checkbox-form";
import { CategoryGridLayout } from "./category-grid-layout/category-grid-layout";

@Component({
  selector: 'app-shop',
  imports: [Header, CheckboxForm, CategoryGridLayout],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {

}
