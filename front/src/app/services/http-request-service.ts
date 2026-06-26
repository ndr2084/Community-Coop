import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../entity/profile';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  httpClient = inject(HttpClient);

  getProfile(){
    return this.httpClient.get('http://localhost:8080/users/profile', {observe: 'response'});
  }

  userCreation(firstNameArg: string | undefined, secondNameArg: string | undefined) : Observable<any>{
    return this.httpClient.post('http://localhost:8080/users/create', {
      firstName: firstNameArg,
      lastName: secondNameArg
    }
    );
  }



  }

