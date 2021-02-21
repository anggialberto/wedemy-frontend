import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NilaiRoutingModule } from './nilai-routing.module';
import { NilaiComponent } from '@bootcamp-admin/pages/nilai/nilai.component';
import { AngMaterialModule } from '@bootcamp-admin/shared/ang-material/ang-material.module';
import { PrimeModule } from '@bootcamp-admin/shared/prime/prime.module';
import { SharedModule } from '@bootcamp-admin/shared/shared.module';


@NgModule({
  declarations: [NilaiComponent],
  imports: [
    CommonModule,
    NilaiRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ]
})
export class NilaiModule { }
