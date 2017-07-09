import { Component } from '@angular/core';
import { FoodPlaceService } from './food-place.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  	FoodPlaceService
	]
})
export class AppComponent {
  title = 'app';
}
