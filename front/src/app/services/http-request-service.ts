import { HttpClient, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../entity/profile';
import { SignUpFormAutoFill } from '../entity/SignUpFormAutoFill';
import { UserIndex } from '../entity/user-index';
import { Item } from '../entity/item';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  httpClient = inject(HttpClient);

  getProfile(): Observable<HttpResponse<SignUpFormAutoFill>> {
    return this.httpClient.get<SignUpFormAutoFill>('http://localhost:8080/users/profile', { observe: 'response' });
  }

  getItem(country: String, province: String, city: String, item: String): Observable<Item[]> {
    const params = new HttpParams()
      .set('country', !country)
      .set('province', !province)
      .set('city', !city)
      .set('item', !item);


    return this.httpClient.get<Item[]>('http://localhost:8080/items/', { params });
  }

}


