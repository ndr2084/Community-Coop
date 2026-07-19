import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIndexService } from '../../../services/user-index-service';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
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
