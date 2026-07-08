import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpRequestService } from '../../services/http-request-service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Profile } from '../../entity/profile';
import { SignUpFormAutoFill } from '../../entity/SignUpFormAutoFill';
import { Router } from '@angular/router'
import { UserIndex } from '../../entity/user-index';
import { UserIndexService } from '../../services/user-index-service';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signUpFormAutoFill!: SignUpFormAutoFill;
  userIndex!: UserIndex;
  imagePreview!: string;


  toggleSignal(signalArgument: WritableSignal<boolean>): void {
    var arg: boolean = false;
    signalArgument.update(current => !current);
  }
  httpRequestService = inject(HttpRequestService);
  routerInline = inject(Router);
  userIndexService = inject(UserIndexService);

  userInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    picture: new FormControl('')
  });

  /*upon successful login, present user to sign up page, or usher user to dashboard if user has signed up before*/
  ngOnInit() {
    this.httpRequestService.getProfile().subscribe(user => {
      if (user.status === 200) {
        this.signUpFormAutoFill = user.body!;
        this.userInfo.patchValue({
          firstName: this.signUpFormAutoFill.name,
          lastName: this.signUpFormAutoFill.familyName,
          email: this.signUpFormAutoFill.email,
          picture: this.signUpFormAutoFill.picture
        });
      }
      if (user.status === 202) {
        this.userIndex = user.body!;
        var firstName = this.userIndex.name;
        var lastName = this.userIndex.familyName;
        var picture = this.userIndex.picture;
        this.userIndexService.setUserIndex(firstName, lastName, picture);
        this.routerInline.navigateByUrl("/home");


      };
    });
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) {
      return;
    }
    this.signUpFormAutoFill.picture = URL.createObjectURL(file);
  }




}

