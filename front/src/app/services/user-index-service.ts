import { Injectable, inject } from '@angular/core';
import { UserIndex } from '../entity/user-index';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserIndexService {

  userIndex : UserIndex = {
    name: '',
    familyName: '',
    picture: ''
  }
  router = inject(Router);


  setUserIndex(firstName: string, lastName: string, picture: string){
    this.userIndex.name = firstName;
    this.userIndex.familyName = lastName;
    this.userIndex.picture = picture;
  }





}
