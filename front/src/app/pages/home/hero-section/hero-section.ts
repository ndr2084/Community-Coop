import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIndexService } from '../../../services/user-index-service';
import { Header } from "../../../page-components/header/header";
import { Greeting } from "./greeting/greeting";
import { UserInteraction } from "./user-interaction/user-interaction";
import { QuickLinks } from "./quick-links/quick-links";

@Component({
  selector: 'app-hero-section',
  imports: [Header, Greeting, UserInteraction, QuickLinks],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  router = inject(Router);

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
