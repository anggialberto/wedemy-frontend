import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersetujuanAbsenRoutingModule } from './persetujuan-absen-routing.module';
import { PersetujuanAbsenComponent } from '@bootcamp-admin/pages/persetujuan-absen/persetujuan-absen.component';
import { AngMaterialModule } from '@bootcamp-admin/shared/ang-material/ang-material.module';
import { PrimeModule } from '@bootcamp-admin/shared/prime/prime.module';
import { SharedModule } from '@bootcamp-admin/shared/shared.module';


@NgModule({
  declarations: [
    PersetujuanAbsenComponent
  ],
  imports: [
    CommonModule,
    PersetujuanAbsenRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ]
})
export class PersetujuanAbsenModule { }
