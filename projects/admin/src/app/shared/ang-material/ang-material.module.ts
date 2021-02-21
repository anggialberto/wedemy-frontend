import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class AngMaterialModule { }
