import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapviewComponent } from './mapview/mapview.component';
import { AgmCoreModule } from '@agm/core';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { HomeComponent } from './home/home.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { FoodPlaceService } from './food-place.service';

const appRoutes: Routes = [
  // { path: 'mapview/', component: MapviewComponent},
  // { path: 'listview/', component: ListViewComponent},
  { path: 'home', component: HomeComponent},
  { path: 'place-detail/:id', component: PlaceDetailComponent},
  { path: '**', redirectTo: 'home' }
];



@NgModule({
  declarations: [
    AppComponent,
    MapviewComponent,
    PlaceDetailComponent,
    HomeComponent,
    PlaceListComponent,
      ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaZjfloS9vK6T4SCM_YVOBwWIDAPbrs9c'
    }),
    RouterModule.forRoot(
      appRoutes,
      /*{ enableTracing: true }*/ // <-- debugging purposes only
    )
  ],
  providers: [FoodPlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
