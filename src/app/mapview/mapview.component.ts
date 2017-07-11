import { Component, OnInit, NgZone } from '@angular/core';
import { FoodPlaceService } from '../food-place.service';	


@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css'],
  providers: []
})

export class MapviewComponent implements OnInit {
	
	initFinished:boolean = false;

	constructor(private foodPlaceService: FoodPlaceService, private ngZone: NgZone) { } 

	ngOnInit(){
	    this.foodPlaceService.initSubject.subscribe((value) => {
			this.ngZone.run(() => {
			    this.initFinished = value;   
			});	                                   
		});
	}
}
