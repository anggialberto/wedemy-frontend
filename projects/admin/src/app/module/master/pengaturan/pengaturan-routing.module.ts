import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PengaturanComponent } from '@bootcamp-admin/pages/pengaturan/pengaturan.component';


const routes: Routes = [
  {
    path: 'pengaturan',
    component: PengaturanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengaturanRoutingModule { }
