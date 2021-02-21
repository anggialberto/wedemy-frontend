import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '@bootcamp-elearning/modules/admin/dashboard/dashboard.module';
import { ProfileModule } from '@bootcamp-elearning/modules/admin/profile/profile.module';
import { ClassModule } from '@bootcamp-elearning/modules/homepage/class/class.module';
import { MaterialModule } from '@bootcamp-elearning/modules/participant-instructor/material/material.module';
import { ReportModule } from '@bootcamp-elearning/modules/participant-instructor/report/report.module';
import { FilterPipe } from '../pipes/filter.pipe';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClassModule,
    DashboardModule,
    MaterialModule,
    ProfileModule,
    ReportModule
  ],
  exports: [
    CommonModule,
    ClassModule,
    DashboardModule,
    MaterialModule,
    ProfileModule,
    ReportModule
  ]
})
export class UserFitureModule { }
