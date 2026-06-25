import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'oauth';
  loginService = inject(LoginService);


}
