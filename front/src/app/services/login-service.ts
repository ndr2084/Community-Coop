import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  redirectToAuthzServer(){
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
