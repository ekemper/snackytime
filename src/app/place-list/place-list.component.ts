import { Component, OnInit } from '@angular/core';
import { FoodPlaceService } from '../food-place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: []
})
export class PlaceListComponent implements OnInit {
  placeKeys: Array<any>;

  constructor(private foodPlaceService: FoodPlaceService) { 
  	this.placeKeys = Object.keys(this.foodPlaceService.placeLookupTable);
  	console.log('placeKeys : ' + this.placeKeys);
  }

  ngOnInit() {

  }

}
