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

		var options = {
		  enableHighAccuracy: true,
		  timeout: 15000,
		  maximumAge: 10000
		};

		function successCallback(pos) {
		  var crd = pos.coords;

		  // console.log('Your current position is:');
		  // console.log(`Latitude : ${crd.latitude}`);
		  // console.log(`Longitude: ${crd.longitude}`);
		  // console.log(`More or less ${crd.accuracy} meters.`);

		  this.foodPlaceService.myLat = crd.latitude;
		  this.foodPlaceService.myLng = crd.longitude;

		  console.log('this.foodPlaceService.myLat: ' + this.foodPlaceService.myLat);
		};

		function errorCallback(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(successCallback.bind(this), errorCallback, options);
	}
	

}
