import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassDetailComponent } from '@bootcamp-homepage/pages/class/detail/class-detail.component';
import { ClassReadComponent } from '@bootcamp-homepage/pages/class/read/class-read.component';
import { CanActivateTeam } from '@bootcamp-homepage/shared/guards/classes/can-activate-team';

const routes: Routes = [
  {
    path: 'class',
    component: ClassReadComponent
  },
  {
    path : 'class/:idClass',
    component: ClassDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
