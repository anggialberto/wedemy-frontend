import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ClassRoutingModule } from './class-routing.module';
import { ClassDetailComponent } from '@bootcamp-elearning/pages/class/detail/class-detail.component';
import { InstructorComponent } from '@bootcamp-elearning/pages/class/instructor/instructor.component';
import { MaterialAddComponent } from '@bootcamp-elearning/pages/class/material/add/material-add.component';
import { MaterialEditComponent } from '@bootcamp-elearning/pages/class/material/edit/material-edit.component';
import { ModuleComponent } from '@bootcamp-elearning/pages/class/module/module.component';
import { ReportReadComponent } from '@bootcamp-elearning/pages/class/report/read/report-read.component';
import { ReportDetailComponent } from '@bootcamp-elearning/pages/class/report/detail/report-detail.component';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    ClassDetailComponent,
    InstructorComponent,
    MaterialAddComponent,
    MaterialEditComponent,
    ModuleComponent,
    ReportReadComponent,
    ReportDetailComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    RouterModule,
    FormsModule,
    TableModule,
    EditorModule,
    ButtonModule,
    SkeletonModule,
    ConfirmDialogModule,
    TabViewModule,
    ToolbarModule,
    SidebarModule

  ],
  providers: [ConfirmationService]
})
export class ClassModule { }
