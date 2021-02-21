import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { KelasRoutingModule } from './kelas-routing.module';
import { KelasComponent } from '../../../pages/kelas/kelas.component';
import { CreateKelasComponent } from '../../../pages/kelas/create-kelas/create-kelas.component';
import { AngMaterialModule } from '../../../shared/ang-material/ang-material.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { SharedModule } from '../../../shared/shared.module';
import { DisableClassComponent } from '@bootcamp-admin/pages/kelas/disable-class/disable-class.component';
import { DtlKelasComponent } from '@bootcamp-admin/pages/kelas/dtl-kelas/dtl-kelas.component';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    KelasComponent,
    CreateKelasComponent,
    DisableClassComponent,
    DtlKelasComponent
  ],
  imports: [
    CommonModule,
    KelasRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "id-ID" },
    DatePipe
  ]
})
export class KelasModule { }
