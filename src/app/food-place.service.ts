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
	initializationFinished: boolean = false;
  	myLat: number;
  	myLng: number;

    googlePlacesService:any;


// Each marker is labeled with a single alphabetical character.
    markerLabels:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex:number = 0;

  	constructor() {
	    google.maps.event.addDomListener(window, "load", this.init.bind(this));
  	}

	initializeMap() {
	    var myOptions = {
	        zoom: 16,
	        center: {lat: this.myLat, lng: this.myLng},
	    };
	    this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}

	createMarker(place:any){

		let markerLat = place.geometry.location.lat();
		let markerLng = place.geometry.location.lng();

		var marker = new google.maps.Marker({
	        position: { lat: markerLat, lng: markerLng },
	        label: this.markerLabels[this.labelIndex++ % this.markerLabels.length],
	        map: this.map
	      });
	}

	getFoodPlaces(){

        this.googlePlacesService.nearbySearch({
          location: {lat: this.myLat, lng: this.myLng},
          radius: 500,
          type: ['food']

        }, (results, status)=>{

        	if (status === google.maps.places.PlacesServiceStatus.OK) {
			  for (var i = 0; i < results.length; i++) {
			    this.createMarker(results[i]);
			  }

			  //console.log('places results : ' + JSON.stringify(results,null,4));

			}else{
				console.warn("places service call not ok");
			}

        });
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

	showUserGeoMarker(){
		var marker = new google.maps.Marker({
          position: {lat: this.myLat, lng: this.myLng},
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6
          },
          draggable: false,
          map: this.map
        });
	}

	init(){
        this.getCurrentGeolocation(()=>{
			this.initializeMap();
			this.showUserGeoMarker();
			this.googlePlacesService = new google.maps.places.PlacesService(this.map);
			this.getFoodPlaces();
			this.initializationFinished = true;
	    });
	}
}
