import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
// import { ContentFilterPipe } from './content-filter.pipe';

import { MapviewComponent } from './mapview/mapview.component'

const appRoutes: Routes = [
  // { path: 'mapview/', component: MapviewComponent},
  // { path: 'listview/', component: ListViewComponent},
  { path: '**', 
    redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}