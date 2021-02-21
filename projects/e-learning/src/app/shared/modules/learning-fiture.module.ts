import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassModule } from '@bootcamp-elearning/modules/class/class.module';
import { DashboardModule } from '@bootcamp-elearning/modules/dashboard/dashboard.module';
import { MaterialModule } from '@bootcamp-elearning/modules/material/material.module';
import { ProfileModule } from '@bootcamp-elearning/modules/profile/profile.module';
import { SettingModule } from '@bootcamp-elearning/modules/setting/setting.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    ClassModule,
    MaterialModule,
    ProfileModule,
    SettingModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    ClassModule,
    MaterialModule,
    ProfileModule,
    SettingModule
  ]
})
export class LearningFitureModule { }
