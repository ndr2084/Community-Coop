import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-service';

@Injectable({
  providedIn: 'root',
})
export class ItemSearchService {
  httpRequestService = inject(HttpRequestService);

  getAllItemsFromLocation(country: String, province: String, city: String, item: String){
    console.log("implement me later");
    this.httpRequestService.getItem(country, province, city, item).subscribe(user => {
      console.log("implement me later");
    })
}
}
