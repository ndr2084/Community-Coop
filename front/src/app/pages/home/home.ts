import { Component, inject } from '@angular/core';
import { Header } from './../../page-components/header/header';
import { Router } from '@angular/router';
import { UserIndexService } from '../../services/user-index-service';

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  router = inject(Router);
  index = inject(UserIndexService);

  viewShop(){
    this.router.navigateByUrl("shop");
  }

  viewRentals(){
    this.router.navigateByUrl("rent");
  }

  viewSelling(){
    this.router.navigateByUrl("sell");
  }

  missionStatement(){
    this.router.navigateByUrl("our-mission");
  }
}
