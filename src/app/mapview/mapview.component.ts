import { Component, OnInit } from '@angular/core';
import { FoodPlaceService } from '../food-place.service';	


@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css'],
  providers: [FoodPlaceService]
})

export class MapviewComponent implements OnInit {
	
	constructor(private foodPlaceService: FoodPlaceService) { } 

	ngOnInit(){
	  
	}
}
