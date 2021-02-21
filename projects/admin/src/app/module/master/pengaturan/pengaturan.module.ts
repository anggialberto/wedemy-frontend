import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { AngMaterialModule } from '../../../shared/ang-material/ang-material.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { SharedModule } from '../../../shared/shared.module';
import { PengaturanComponent } from '@bootcamp-admin/pages/pengaturan/pengaturan.component';


@NgModule({
  declarations: [
    PengaturanComponent,
  ],
  imports: [
    CommonModule,
    PengaturanRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ]
})
export class PengaturanModule { }
