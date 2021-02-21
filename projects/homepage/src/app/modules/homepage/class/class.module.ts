import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassDetailComponent } from '@bootcamp-homepage/pages/class/detail/class-detail.component';
import { ClassReadComponent } from '@bootcamp-homepage/pages/class/read/class-read.component';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { ClassFilterPipe } from '@bootcamp-homepage/shared/pipes/class-filter.pipe';
import { ModuleFilterPipe } from '@bootcamp-homepage/shared/pipes/module-filter.pipe';
import { CanActivateTeam } from '@bootcamp-homepage/shared/guards/classes/can-activate-team';
import { Permissions } from '@bootcamp-homepage/shared/guards/classes/permissions';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id'; 
registerLocaleData(localeId, 'id'); 

@NgModule({
  declarations: [
    ClassDetailComponent,
    ClassReadComponent,
    ClassFilterPipe,
    ModuleFilterPipe
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    PrimeNGModule,
    RouterModule
  ],
  providers: [
    CanActivateTeam, 
    Permissions,
    { provide: LOCALE_ID, useValue: "id-ID" },
  ]
})
export class ClassModule { }
