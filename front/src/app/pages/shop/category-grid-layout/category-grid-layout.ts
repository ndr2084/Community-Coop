import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-category-grid-layout',
  imports: [],
  templateUrl: './category-grid-layout.html',
  styleUrl: './category-grid-layout.css',
})
export class CategoryGridLayout {

  categories = ['Hiking', 'Biking', 'Skiing'];
  isActive = signal<string | boolean>(false);

  updateSignal(category: string){
    console.log(category);
    if(this.isActive() === category){
      return this.isActive.set(false);
    }
    return this.isActive.set(category);
  }
}
