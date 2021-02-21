import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAdminComponent } from '../../../pages/users/user-admin/user-admin.component';
import { UserTutorComponent } from '../../../pages/users/user-tutor/user-tutor.component';
import { UserStudentComponent } from '../../../pages/users/user-student/user-student.component';
import { CreateTutorComponent } from '../../../pages/users/user-tutor/create-tutor/create-tutor.component';
import { AngMaterialModule } from '../../../shared/ang-material/ang-material.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { SharedModule } from '../../../shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    UserAdminComponent,
    UserTutorComponent,
    UserStudentComponent,
    CreateTutorComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngMaterialModule,
    PrimeModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "id-ID" },
    DatePipe
  ]
})
export class UserModule { }
