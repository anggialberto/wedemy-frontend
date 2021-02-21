import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutoCompleteModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    PaginatorModule,
    MenubarModule,
    MenuModule,
    SplitterModule,
    DividerModule
  ],
  exports: [
    CommonModule,
    AutoCompleteModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    PaginatorModule,
    MenubarModule,
    MenuModule,
    SplitterModule,
    DividerModule
  ]
})
export class PrimeNgModule { }
