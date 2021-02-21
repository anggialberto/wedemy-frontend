import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '@bootcamp-homepage/pages/home/home.component';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    PrimeNGModule
  ]
})
export class HomeModule { }
