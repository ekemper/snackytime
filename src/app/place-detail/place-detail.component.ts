import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FoodPlaceService } from '../food-place.service';	

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers:[/*FoodPlaceService*/]
})
export class PlaceDetailComponent implements OnInit {

  place:any;	
  placeId: number;
  private sub: any;
  
  constructor(/*private foodPlaceService: FoodPlaceService,*/ private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
        this.placeId = +params['id']; // (+) converts string 'id' to a number
  	    // this.place = this.foodPlaceService.getPlaceDetails(this.placeId);
    });
  
  }


}
