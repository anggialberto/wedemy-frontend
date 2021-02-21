import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PartialModule } from '@bootcamp-homepage/modules/homepage/partial/partial.module';
import { HomepageBaseComponent } from '@bootcamp-homepage/layouts/base/homepage/homepage-base.component';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [HomepageBaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    PartialModule,
    PrimeNGModule
  ]
})
export class HomepageBaseModule { }
