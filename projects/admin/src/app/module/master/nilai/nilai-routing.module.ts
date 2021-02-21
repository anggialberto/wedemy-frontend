import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NilaiComponent } from '../../../pages/nilai/nilai.component';


const routes: Routes = [
  {
    path: 'nilai',
    component: NilaiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NilaiRoutingModule { }
