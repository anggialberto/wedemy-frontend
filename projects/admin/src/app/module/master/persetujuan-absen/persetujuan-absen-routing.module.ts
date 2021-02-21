import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersetujuanAbsenComponent } from '@bootcamp-admin/pages/persetujuan-absen/persetujuan-absen.component';

const routes: Routes = [
  {
    path: 'status-absen',
    component: PersetujuanAbsenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersetujuanAbsenRoutingModule { }
