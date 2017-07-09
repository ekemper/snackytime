import { Injectable } from '@angular/core';

import { FoodPlace } from './food-place';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var google;


@Injectable()
export class FoodPlaceService {
	//map:any;
	//infowindow:any = new google.maps.InfoWindow();

    //googlePlacesService:any = new google.maps.places.PlacesService(this.map);

  	constructor() {

  		// this.map = new google.maps.Map(document.getElementById('map'), {
    //       center: {lat: -33.867, lng: 151.195},
    //       zoom: 15
    //     });
  	}

  	myLat: number;
  	myLng: number;

	baseUrl: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

	//bad doodoo, put this in an environment var or something...
	apiKey: string = 'AIzaSyDaZjfloS9vK6T4SCM_YVOBwWIDAPbrs9c';


// location: string = 
// location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

	formFoodPlacesUrl(){


		let locationParam = '&location=' + this.myLat + ',' + this.myLng;

		let otherParams = '&radius=500&type=restaurant&keyword=cruise';

		let apiKeyParam = '&key=' + this.apiKey;

		let url = this.baseUrl + locationParam + otherParams + apiKeyParam;

		console.log('formed url : ' + url);

		return url;

	}

	// getFoodPlaces(){

 //        this.googlePlacesService.nearbySearch({
 //          location: {lat: this.myLat, lng: this.myLng},
 //          radius: 500,
 //          type: ['store']
 //        }, this.nearbySearchCallback);
	// }

	// nearbySearchCallback(results, status) {
	// 	if (status === google.maps.places.PlacesServiceStatus.OK) {
	// 	  // for (var i = 0; i < results.length; i++) {
	// 	  //   this.createMarker(results[i]);
	// 	  // }

	// 	  console.log('places results : ' + results);

	// 	}else{
	// 		console.warn("places service call not ok");
	// 	}
	// }

	getCurrentGeolocation(callback){
		var options = {
		  enableHighAccuracy: true,
		  timeout: 15000,
		  maximumAge: 10000
		};

		function successCallback(pos) {
		  var crd = pos.coords;

		  this.myLat = crd.latitude;
		  this.myLng = crd.longitude;

		  console.log('foodPlaceService.myLat: ' + this.myLat);

		  //this.initMap();

		  callback();
		};

		function errorCallback(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(successCallback.bind(this), errorCallback, options);
	}
}
