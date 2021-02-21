import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { EditorModule } from 'primeng/editor';
import {SkeletonModule} from 'primeng/skeleton';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    DividerModule,
    DialogModule,
    ConfirmPopupModule,
    TooltipModule,
    ToolbarModule,
    ConfirmDialogModule,
    CalendarModule,
    InputMaskModule,
    EditorModule,
    SkeletonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule
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
    DividerModule,
    DialogModule,
    ConfirmPopupModule,
    TooltipModule,
    ToolbarModule,
    ConfirmDialogModule,
    CalendarModule,
    InputMaskModule,
    EditorModule,
    SkeletonModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNGModule { }
