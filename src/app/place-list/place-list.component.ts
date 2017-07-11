import { Component, OnInit, NgZone } from '@angular/core';
import { FoodPlaceService } from '../food-place.service';
// import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: []
})
export class PlaceListComponent implements OnInit {

  initFinished:boolean = false;
  places:object;
  placesKeys:Array<any>;

  constructor(private foodPlaceService: FoodPlaceService, private ngZone: NgZone) {}

  ngOnInit() {
  	this.foodPlaceService.initSubject.subscribe((value) => {
		this.ngZone.run(() => {
		    this.initFinished = value;   
		    this.places = this.foodPlaceService.placeLookupTable;
		    this.placesKeys = Object.keys(this.places);
		});                                     
	});
  }

}
