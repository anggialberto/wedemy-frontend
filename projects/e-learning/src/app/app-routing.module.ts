import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateTeam } from '@bootcamp-homepage/shared/guards/classes/can-activate-team';
import { BaseComponent } from './layouts/base/base.component';
import { BaseModule } from './modules/base/base.module';

const routes: Routes = [
  {
    path: 'instructor',
    component: BaseComponent,
    loadChildren: () => import('@bootcamp-elearning/modules/instructor.module')
      .then(m => m.InstructorModule),
    canActivate: [CanActivateTeam]
  },
  {
    path: 'participant',
    component: BaseComponent,
    loadChildren: () => import('@bootcamp-elearning/modules/participant.module')
      .then(m => m.ParticipantModule),
    canActivate: [CanActivateTeam]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }