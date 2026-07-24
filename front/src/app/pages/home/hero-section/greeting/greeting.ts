import { Component, inject } from '@angular/core';
import { UserIndexService } from '../../../../services/user-index-service';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.html',
  styleUrl: './greeting.css',
})
export class Greeting {
  index = inject(UserIndexService);
}
