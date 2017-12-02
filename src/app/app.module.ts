import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TelemetryService } from './telemetry.service';

//styles
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule, MatTooltipModule } from '@angular/material';
import { MapChildComponent } from './map-child/map-child.component';


const ROUTES = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	}
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapChildComponent
  ],
  imports: [
	  BrowserModule,
	  BrowserAnimationsModule,
	  MatButtonModule, 
	  MatFormFieldModule, 
	  MatInputModule, 
	  MatSelectModule, 
	  MatMenuModule, 
	  MatTabsModule, 
	  MatProgressSpinnerModule, 
	  MatProgressBarModule, 
	  MatChipsModule, 
	  MatTooltipModule,
	  HttpModule,
	  AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyBtAeoKsNJDxhlibgbcBp_lfxSaxTOIzvE'
	  }),
	  RouterModule.forRoot(ROUTES)
  ],
  providers: [TelemetryService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
