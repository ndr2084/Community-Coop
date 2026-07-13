import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserShopService {
  //PRIVATE
  private readonly __items = signal<Item[]>([]);

  //PUBLIC
  readonly items = this.__items.asReadonly;

  //CRUD  OPERATIONS
  create(
    name: string, price: number, isForRent: boolean, isForSale: boolean,
    condition: string, picture: string[], description: string
   ){
    this.__items.update( (list) =>
        [
          ...list,
          {
            id: Date.now(),
            name: name,
            price: price,
            isForRent: isForRent,
            isForSale: isForSale,
            condition: condition,
            picture: picture,
            description: description
          }
        ]
    )
  }

  updateDescription (id: number, newDescription: string){
    this.__items.update(
      (list) => list.map(
      (item) => item.id === id ? {...item, description: newDescription} : item
      ))
  }

  delete(id: number){
    this.__items.update(
      (list) => list.filter(
      (item) => item.id !== id
      ))
  }
}

export interface Item{
  id: number;
  name: string;
  price: number;
  isForRent: boolean;
  isForSale: boolean;
  condition: string,
  picture: string[],
  description: string
}
