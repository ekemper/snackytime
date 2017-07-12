import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodPlaceService } from '../food-place.service';	

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers:[]
})
export class PlaceDetailComponent implements OnInit {

  place:any;	
  placeId: number;
  private sub: any;
  photoSrc:string;
  initFinished:boolean = false;

  constructor(private foodPlaceService: FoodPlaceService, 
              private route: ActivatedRoute,
              private ngZone: NgZone) {

    this.initFinished = false;

  }

  ngOnInit() {


    //this.foodPlaceService.init();

    this.sub = this.route.params.subscribe(params => {
        
        this.foodPlaceService.initSubject.subscribe((value) => {
          this.ngZone.run(() => {


              this.placeId = params['id']; 
              this.place = this.foodPlaceService.placeDetailsById[this.placeId];
              console.log('placedetail : ' + JSON.stringify(this.place,null,4));

              this.photoSrc = /*this.place.photos[0].getUrl() ||*/ this.place.icon;
              this.initFinished = value;   

          });                                     
        });



    });
  
  }


}
