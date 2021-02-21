import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SilabusComponent } from '@bootcamp-admin/pages/silabus/silabus.component';


const routes: Routes = [
  {
    path: 'silabus',
    component: SilabusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SilabusRoutingModule { }
