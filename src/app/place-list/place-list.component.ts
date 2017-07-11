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

  constructor(private foodPlaceService: FoodPlaceService, private ngZone: NgZone) {}

  ngOnInit() {
  	this.foodPlaceService.initSubject.subscribe((value) => {

			this.ngZone.run(() => {
				console.log("Subscription got", value);
			    this.initFinished = value;   
			    console.log('in mapview - this.initFinished : ' + this.initFinished);
			});                                     
	});
  }

}
