import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapviewComponent } from './mapview/mapview.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapviewComponent,
      ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaZjfloS9vK6T4SCM_YVOBwWIDAPbrs9c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
