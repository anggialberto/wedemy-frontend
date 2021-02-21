import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '@bootcamp-elearning/app-routing.module';
import { Title } from '@angular/platform-browser';
import { CanActivateTeam } from '@bootcamp-homepage/shared/guards/classes/can-activate-team';
import { Permissions } from '@bootcamp-homepage/shared/guards/classes/permissions';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
    CanActivateTeam, Permissions
  ]
})
export class AppModule { }
