import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from '@bootcamp-homepage/layouts/auth/forgot-password/forgot-password.component';
import { LoginComponent } from '@bootcamp-homepage/layouts/auth/login/login.component';
import { RegisterComponent } from '@bootcamp-homepage/layouts/auth/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
