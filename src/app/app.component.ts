import { Component } from '@angular/core';
import { FoodPlaceService } from './food-place.service';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  	FoodPlaceService,
  	// Http, 
  	// Response, 
  	// Headers, 
  	// RequestOptions
	]
})
export class AppComponent {
  title = 'app';
}
