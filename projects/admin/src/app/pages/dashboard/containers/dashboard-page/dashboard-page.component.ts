import { Component } from '@angular/core';
import { Users } from '@bootcamp-admin/model/users';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { UserService } from '@bootcamp-admin/service/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  user: Users = new Users();

  constructor(private userService: UserService, private auth: AuthService) {
    this.getUsers();
  }

  getUsers(): void {
    let id = this.auth.getUserId();

    this.userService.getUserById(id).subscribe(val => {
      this.user = val.data;
      console.log(val)
    })
  }
}
