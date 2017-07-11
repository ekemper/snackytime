import { Injectable } from '@angular/core';

// import { FoodPlace } from './food-place';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 
// Import RxJs required methods
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

declare var google;


@Injectable()
export class FoodPlaceService {
	map:any;
  	myLat: number;
  	myLng: number;
  	placeLookupTable:object = {};
    googlePlacesService:any;
    markerLabels:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex:number = 0;
    selectedPlace: any;
    placeKeys: any;

    initFinished:boolean = false;

	initSubject:BehaviorSubject<any> = new BehaviorSubject(false); 

  	constructor() {
	    google.maps.event.addDomListener(window, "load", this.init.bind(this));

		this.initSubject.subscribe((value) => {
		  console.log("Subscription got", value);
		  this.initFinished = value;                                      
		});

  	}

	init(){
        this.getCurrentGeolocation(()=>{
			this.initializeMap();
			this.showUserGeoMarker();
			this.googlePlacesService = new google.maps.places.PlacesService(this.map);
			this.getFoodPlaces(()=>{
				this.getPlaceKeys();
	  	        console.log('placeKeys : ' + this.placeKeys);
				this.initSubject.next(true);				
			});

	    });
	}

  	getPlaceDetails(placeId){
		var request = {placeId: 'placeId'};
		this.googlePlacesService.getDetails(request, (place, status)=>{
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				return place;
			}else{
				console.warn('error getting place details...');
			}
		});
  	}

	initializeMap() {
	    var myOptions = {
	        zoom: 16,
	        center: {lat: this.myLat, lng: this.myLng},
	    };
	    this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}

	handleMarkerClick(event:any){
		console.log('event : ' + JSON.stringify(event,null,4));
		let key = this.makeKeyFromLatLng(event.latLng.lat(),event.latLng.lng());
		this.selectedPlace = this.placeLookupTable[key];
	}

	makeKeyFromLatLng(markerLat:number, markerLng:number){
		let key = markerLat.toString() + markerLng.toString();
		return key;
	}

	addPlaceToTable(place:any, markerLat:number, markerLng:number){
		let newKey = this.makeKeyFromLatLng(markerLat, markerLng);
		this.placeLookupTable[newKey] = place;
	}

	createMarker(place:any){

		let markerLat = place.geometry.location.lat();
		let markerLng = place.geometry.location.lng();

		var marker = new google.maps.Marker({
	        position: { lat: markerLat, lng: markerLng },
	        label: this.markerLabels[this.labelIndex++ % this.markerLabels.length],
	        map: this.map
	      });

		// let newPlace = new FoodPlace({
		// 	lat: place.geometry.location.lat(),
		// 	lng: place.geometry.location.lat()
		// });

		this.addPlaceToTable(place, markerLat, markerLng);

        google.maps.event.addListener(marker, "click", (event)=>{
        	this.handleMarkerClick(event);
        });

	}

	getFoodPlaces(callback){

        this.googlePlacesService.nearbySearch({
          location: {lat: this.myLat, lng: this.myLng},
          radius: 500,
          type: ['food']

        }, (results, status)=>{

        	if (status === google.maps.places.PlacesServiceStatus.OK) {
			  for (var i = 0; i < results.length; i++) {
			    this.createMarker(results[i]);
			  }

			  callback()
			  //this.handleFoodPlacesCallback();
			  //console.log('places results : ' + JSON.stringify(results,null,4));

			}else{
				console.warn("error with places service call...");
				console.warn(google.maps.places.PlacesServiceStatus);
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

	getPlaceKeys(){
		this.placeKeys = Object.keys(this.placeLookupTable);
	}
}
