import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../entity/profile';
import { SignUpFormAutoFill } from '../entity/SignUpFormAutoFill';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  httpClient = inject(HttpClient);

  getProfile() : Observable<HttpResponse<SignUpFormAutoFill>>{
    return this.httpClient.get<SignUpFormAutoFill>('http://localhost:8080/users/profile', {observe: 'response'});
  }



  }


