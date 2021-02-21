import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusTugasComponent } from '@bootcamp-admin/pages/status-tugas/status-tugas.component';


const routes: Routes = [
  {
    path: 'status-tugas',
    component: StatusTugasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusTugasRoutingModule { }
