import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SilabusRoutingModule } from './silabus-routing.module';
import { AngMaterialModule } from '../../../shared/ang-material/ang-material.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { SharedModule } from '../../../shared/shared.module';
import { SilabusComponent } from '@bootcamp-admin/pages/silabus/silabus.component';


@NgModule({
  declarations: [
    SilabusComponent
  ],
  imports: [
    CommonModule,
    SilabusRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ]
})
export class SilabusModule { }
