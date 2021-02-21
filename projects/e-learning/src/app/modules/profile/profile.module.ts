import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '@bootcamp-elearning/pages/profile/profile.component';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id'; 
registerLocaleData(localeId, 'id'); 

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "id-ID" },
    DatePipe
  ]
})
export class ProfileModule { }
