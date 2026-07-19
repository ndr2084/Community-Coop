import { Component, inject } from '@angular/core';
import { Header } from './../../page-components/header/header';
import { Router } from '@angular/router';
import { UserIndexService } from '../../services/user-index-service';
import { HeroSection } from "./hero-section/hero-section";

@Component({
  selector: 'app-home',
  imports: [Header, HeroSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


}
