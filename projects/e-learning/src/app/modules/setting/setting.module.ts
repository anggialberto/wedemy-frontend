import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from '@bootcamp-elearning/pages/setting/setting.component';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    PrimeNGModule
  ]
})
export class SettingModule { }
