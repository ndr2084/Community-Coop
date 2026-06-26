import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpRequestService } from '../../services/http-request-service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Profile } from '../../entity/profile';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  myUser: User = { email: "" };
  myProfile: Profile = {firstName: "", lastName: ""};

  toggleSignal(signalArgument: WritableSignal<boolean>): void {
    var arg: boolean = false;
    signalArgument.update(current => !current);
  }
  httpRequestService = inject(HttpRequestService);

  ngOnInit(){
    this.httpRequestService.getProfile().subscribe({
      next : (profile) =>{
        if(profile.status === 200){
          window.location.href=('http://localhost:4200/home');
        }
      },
      error : (err) => console.log(err),
      complete: () => console.log('done'),
    })
  }


  userInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  onSubmit() {
    this.httpRequestService.userCreation(
      this.userInfo.value.firstName ?? '',
      this.userInfo.value.lastName ?? '').subscribe();
  }
}

interface User {
  email: string;
}
