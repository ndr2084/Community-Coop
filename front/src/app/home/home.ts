import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpRequestService } from '../services/http-request-service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


adminSignal = signal<boolean>(false);
userSignal = signal<boolean>(false);
myUser : User = {email: ""};




toggleSignal(signalArgument: WritableSignal<boolean>): void{
  var arg : boolean = false;
  signalArgument.update(current => !current);
}
httpRequestService = inject(HttpRequestService);

userInfo = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
});

onSubmit(){
  this.httpRequestService.userCreation(
    this.userInfo.value.firstName ?? '',
    this.userInfo.value.lastName ?? '').subscribe();
}


  user = () =>{
      this.httpRequestService.getUser().subscribe({
        next: body => {
          this.myUser.email = body;
        },
        error: err => console.log(err),
        complete: () => console.log("complete!")
      });
      this.toggleSignal(this.userSignal);
  }

  admin = () => {
      this.httpRequestService.getAdmin().subscribe({
        next: body => {
        this.myUser.email = body;
        },
        error: err => {
          console.log(err)
        },
        complete: () => {
          console.log("complete!")
        }
      })
      this.toggleSignal(this.adminSignal);
  }
}

interface User {
  email: string;
}
