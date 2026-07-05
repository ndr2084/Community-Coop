import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpRequestService } from '../../services/http-request-service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Profile } from '../../entity/profile';
import { SignUpFormAutoFill } from '../../entity/SignUpFormAutoFill';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  imageUrl !: string;
  signUpFormAutoFill!: SignUpFormAutoFill;


  toggleSignal(signalArgument: WritableSignal<boolean>): void {
    var arg: boolean = false;
    signalArgument.update(current => !current);
  }
  httpRequestService = inject(HttpRequestService);

  ngOnInit(){
    this.httpRequestService.getProfile().subscribe({
      next : (response) =>{
        this.signUpFormAutoFill = response;
        this.imageUrl = response.picture;
      },
      error : (err) => console.log(err),
      complete: () => console.log('done'),
    })
  }


  userInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
}
