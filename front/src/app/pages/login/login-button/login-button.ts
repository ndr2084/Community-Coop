import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.html',
  styleUrl: './login-button.css',
})
export class LoginButton {
  loginService = inject(LoginService);

  login(){
    this.loginService.redirectToAuthzServer();
  }
}
