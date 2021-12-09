import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule}  from '@angular/material/slider';

import { AppRoutingModule }      from './app-routing.module';

import { AppComponent }          from './app.component';
import { CameraDetailComponent } from './camera-detail/camera-detail.component';
import { CamerasComponent }      from './cameras/cameras.component';
import { CameraAddComponent }    from './camera-add/camera-add.component';
import { BeginWorkComponent }    from './begin-work/begin-work.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  declarations: [
    AppComponent,
    CamerasComponent,
    CameraDetailComponent,
    CameraAddComponent,
    BeginWorkComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
