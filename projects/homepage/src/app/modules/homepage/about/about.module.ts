import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from '@bootcamp-homepage/pages/about/about.component';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PrimeNGModule,
    RouterModule,
  ]
})
export class AboutModule { }
