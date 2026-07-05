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

  signUpFormAutoFill!: SignUpFormAutoFill;
  imagePreview!: string;


  toggleSignal(signalArgument: WritableSignal<boolean>): void {
    var arg: boolean = false;
    signalArgument.update(current => !current);
  }
  httpRequestService = inject(HttpRequestService);

  userInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    picture: new FormControl('')
  });

  ngOnInit() {
    this.httpRequestService.getProfile().subscribe(user => {
      if(user.status === 200){
      this.signUpFormAutoFill = user.body;
      this.userInfo.patchValue({
        firstName: this.signUpFormAutoFill.name,
        lastName: this.signUpFormAutoFill.familyName,
        email: this.signUpFormAutoFill.email,
        picture: this.signUpFormAutoFill.picture
      });
    }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (!file) {
      return;
    }
    console.log(file);
    this.signUpFormAutoFill.picture = URL.createObjectURL(file);
  }




}

