import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from '@bootcamp-elearning/pages/material/answer/answer.component';
import { AssignmentComponent } from '@bootcamp-elearning/pages/material/assignment/assignment.component';
import { ForumComponent } from '@bootcamp-elearning/pages/material/forum/forum.component';
import { PresenceComponent } from '@bootcamp-elearning/pages/material/presence/presence.component';
import { MaterialReadComponent } from '@bootcamp-elearning/pages/material/read/material-read.component';

const routes: Routes = [
  {
    path: 'material',
    component: MaterialReadComponent,
    children: [
      { path: '', redirectTo: 'forum', pathMatch: 'full' },
      { path: 'forum', component: ForumComponent },
      { path: 'answer', component: AnswerComponent },
      { path: 'presence', component: PresenceComponent },
      { path: 'assignment', component: AssignmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
