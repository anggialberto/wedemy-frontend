import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialEditComponent } from '@bootcamp-elearning/pages/class/material/edit/material-edit.component';
import { ClassDetailComponent } from '../../pages/class/detail/class-detail.component';
import { InstructorComponent } from '../../pages/class/instructor/instructor.component';
import { MaterialAddComponent } from '../../pages/class/material/add/material-add.component';
import { ModuleComponent } from '../../pages/class/module/module.component';
import { ReportReadComponent } from '../../pages/class/report/read/report-read.component';

const routes: Routes = [
  {
    path: 'class',
    component: ClassDetailComponent,
    children: [
      { path: 'instructor/:idDetailClass', component: InstructorComponent },
      { path: 'enrolled/:idDetailClass', component: ModuleComponent },
      { path: 'report/:idDetailClass', component: ReportReadComponent },
      { path: 'add-material/:idDetailClass', component: MaterialAddComponent },
      { path: 'edit-material/:idDetailClass', component: MaterialEditComponent }
      // { path: 'add-material/:idModuleRegistration', component: MaterialAddComponent },
      // { path: 'edit-material/:idDetailModuleRegistration', component: MaterialEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
