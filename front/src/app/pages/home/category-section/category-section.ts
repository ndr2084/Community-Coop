import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AccordianModal } from './accordian-modal/accordian-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-section',
  imports: [ReactiveFormsModule],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {

  dialog = inject(Dialog);
  router = inject(Router);

  openModal(){
    this.dialog.open(AccordianModal, {
      disableClose: true,
      height: '100%',
      width: '100%'
    })
  }

  redirect(uriName: string) {
    if(uriName === 'CanoesKayaks'){
      console.log("booty");
      this.router.navigateByUrl("shop/watersports/canoes-kayaks");
    }
    if(uriName === 'books'){
      this.router.navigateByUrl("shop/education/books");
    }

    if(uriName === 'crashpads'){
      this.router.navigateByUrl("shop/climbing/crash-pads");
    }

    if(uriName === 'tents'){
      this.router.navigateByUrl("shop/camping/tents");
    }

    if(uriName ==='shop'){
      this.router.navigateByUrl("shop");
    }

  }
}
