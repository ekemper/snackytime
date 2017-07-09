import { Injectable } from '@angular/core';

import { FoodPlace } from './food-place';
import { Observable } from 'rxjs/Rx';

import { Http, Response, Headers, RequestOptions } from '@angular/http';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FoodPlaceService {

  	// constructor(private http: Http) {}
  	constructor(){}

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

	// getFoodPlaces() : Observable<FoodPlace[]> {
	// 	return this.http.get(this.formFoodPlacesUrl())
	// 		.map((res:Response) => res.json())
	// 		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	// }







	// // infowindow = new google.maps.InfoWindow();
 //    var service = new google.maps.places.PlacesService(map);
 //    service.nearbySearch({
 //      location: pyrmont,
 //      radius: 500,
 //      type: ['store']
 //    }, callback);


	// function callback(results, status) {
	// 	if (status === google.maps.places.PlacesServiceStatus.OK) {
	// 	  for (var i = 0; i < results.length; i++) {
	// 	    createMarker(results[i]);
	// 	  }
	// 	}
	// }

	// function createMarker(place) {
	// 	var placeLoc = place.geometry.location;
	// 	var marker = new google.maps.Marker({
	// 	  map: map,
	// 	  position: place.geometry.location
	// });

	// google.maps.event.addListener(marker, 'click', function() {
	//   infowindow.setContent(place.name);
	//   infowindow.open(map, this);
	// });
	




}
