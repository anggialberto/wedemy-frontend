import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialModule } from '@bootcamp-elearning/modules/partial/partial.module';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@bootcamp-elearning/layouts/base/base.component';


@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    PartialModule
  ]
})
export class BaseModule { }