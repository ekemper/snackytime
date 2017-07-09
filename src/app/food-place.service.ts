import { Injectable } from '@angular/core';

import { FoodPlace } from './food-place';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var google;


@Injectable()
export class FoodPlaceService {
	map:any;
	//infowindow:any = new google.maps.InfoWindow();

  	myLat: number;
  	myLng: number;

	// baseUrl: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

	//bad doodoo, put this in an environment var or something...
	// apiKey: string = 'AIzaSyDaZjfloS9vK6T4SCM_YVOBwWIDAPbrs9c';
    googlePlacesService:any;

  	constructor() {

	    google.maps.event.addDomListener(window, "load", this.init.bind(this));
  	}

	initializeMap() {
	    var latlng = new google.maps.LatLng(this.myLat, this.myLng);
	    var myOptions = {
	        zoom: 8,
	        center: latlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    this.map = new google.maps.Map(document.getElementById("map"), myOptions);
	}

	getFoodPlaces(){

	    function nearbySearchCallback(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
			  // for (var i = 0; i < results.length; i++) {
			  //   this.createMarker(results[i]);
			  // }

			  console.log('places results : ' + results);

			}else{
				console.warn("places service call not ok");
			}
		}

        this.googlePlacesService.nearbySearch({
          location: {lat: this.myLat, lng: this.myLng},
          radius: 500,
          type: ['store']
        }, nearbySearchCallback);
	}

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

		  callback();
		};

		function errorCallback(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(successCallback.bind(this), errorCallback, options);
	}


	init(){

        this.getCurrentGeolocation(()=>{

	  	  console.log('this.myLat : ' + this.myLat);

	  	  this.initializeMap();
		  this.googlePlacesService = new google.maps.places.PlacesService(this.map);



		  this.getFoodPlaces();
	    });
	}
}
