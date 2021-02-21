import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@bootcamp-homepage/layouts/auth/login/login.component';
import { RegisterComponent } from '@bootcamp-homepage/layouts/auth/register/register.component';
import { ForgotPasswordComponent } from '@bootcamp-homepage/layouts/auth/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '@bootcamp-homepage/shared/prime-ng/prime-ng.module';
import { PartialModule } from '@bootcamp-homepage/modules/homepage/partial/partial.module';


@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    PrimeNGModule,
    PartialModule
  ]
})
export class AuthModule { }
