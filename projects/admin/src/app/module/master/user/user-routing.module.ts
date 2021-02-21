import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminComponent } from '../../../pages/users/user-admin/user-admin.component';
import { UserStudentComponent } from '../../../pages/users/user-student/user-student.component';
import { CreateTutorComponent } from '../../../pages/users/user-tutor/create-tutor/create-tutor.component';
import { UserTutorComponent } from '../../../pages/users/user-tutor/user-tutor.component';


const routes: Routes = [
  {
    path: 'user-admin',
    component: UserAdminComponent
  },
  {
    path: 'user-tutor',
    component: UserTutorComponent
  },
  {
    path: 'user-student',
    component: UserStudentComponent
  },
  {
    path: 'create/:user',
    component: CreateTutorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
