import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { LoginButton } from "./login-button/login-button";

@Component({
  selector: 'app-login',
  imports: [LoginButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


}
