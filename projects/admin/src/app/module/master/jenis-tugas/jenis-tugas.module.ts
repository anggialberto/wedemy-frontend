import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JenisTugasRoutingModule } from './jenis-tugas-routing.module';
import { JenisTugasComponent } from '../../../pages/jenis-tugas/jenis-tugas.component';
import { AngMaterialModule } from '../../../shared/ang-material/ang-material.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    JenisTugasComponent
  ],
  imports: [
    CommonModule,
    JenisTugasRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ]
})
export class JenisTugasModule { }
