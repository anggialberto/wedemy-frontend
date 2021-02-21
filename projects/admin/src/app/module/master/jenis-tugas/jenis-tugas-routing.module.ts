import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JenisTugasComponent } from '../../../pages/jenis-tugas/jenis-tugas.component';


const routes: Routes = [
  {
    path: 'jenis-tugas',
    component: JenisTugasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JenisTugasRoutingModule { }
