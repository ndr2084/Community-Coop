import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  httpClient = inject(HttpClient);

  getUser() : Observable<any> {
    return this.httpClient.get("http://localhost:8080/users/default")
  }

  getAdmin() : Observable<any> {
    return this.httpClient.get("http://localhost:8080/admin/default", { responseType: 'text'})
  }

  userCreation(firstNameArg: string | undefined, secondNameArg: string | undefined) : Observable<any>{
    return this.httpClient.post('http://localhost:8080/users/create', {
      firstName: firstNameArg,
      lastName: secondNameArg
    }
    );
  }

  }

