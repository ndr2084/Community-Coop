import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginService = inject(LoginService);

  login(){
    this.loginService.redirectToAuthzServer();
  }
}
