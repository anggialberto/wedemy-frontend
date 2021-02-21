import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { ClassModule } from './class/class.module';
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutModule,
    HomeModule,
    ClassModule
    // Location
    // HttpClientModule
  ],
  providers: [
    DatePipe
  ]
})
export class HomepageModule { }
