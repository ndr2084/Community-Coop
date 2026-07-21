import { Component, inject } from '@angular/core';
import { Header } from './../../page-components/header/header';
import { Router } from '@angular/router';
import { UserIndexService } from '../../services/user-index-service';
import { HeroSection } from "./hero-section/hero-section";
import { CategorySection } from "./category-section/category-section";

@Component({
  selector: 'app-home',
  imports: [Header, HeroSection, CategorySection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


}
