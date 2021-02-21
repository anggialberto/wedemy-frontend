import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '@bootcamp-elearning/pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from '@bootcamp-elearning/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SkeletonModule,
    PrimeNGModule
  ]
})
export class DashboardModule { }
