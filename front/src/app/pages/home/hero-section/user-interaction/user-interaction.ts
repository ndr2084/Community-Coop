import { Component, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ItemSearchService } from '../../../../services/item-search-service';

@Component({
  selector: 'app-user-interaction',
  imports: [ReactiveFormsModule],
  templateUrl: './user-interaction.html',
  styleUrl: './user-interaction.css',
})
export class UserInteraction {

  itemSearchService = inject(ItemSearchService);

  searchForm = new FormGroup({
    item: new FormControl(''),
    country: new FormControl(''),
    province: new FormControl(''),
    city: new FormControl(''),
  });

  submitForm(){
    console.log("user sent query search for item");
    this.itemSearchService.getAllItemsFromLocation(
      this.searchForm.value.country?? '',
      this.searchForm.value.province?? '',
      this.searchForm.value.city?? '',
      this.searchForm.value.item?? ''
    )
  }






}
