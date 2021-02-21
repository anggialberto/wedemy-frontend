import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@bootcamp-elearning/models/user';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { Users } from '@bootcamp-homepage/models/users';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { UserService } from '@bootcamp-homepage/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Users = new Users();
  defaultImg: string = "/assets/img/profile-default.jpeg";
  firstName: string;

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {

    if (this.authService.getToken) {
      this.userService.getUserById(this.authService.getUserId()).subscribe(
        res => {
          this.user = res.data;
          this.getFirstName();
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigateByUrl('/auth/login');
  }

  dashboard(): void {
    if (this.authService.getRole() == ROLE.PARTICIPANT) {
      this.router.navigateByUrl('/participant/dashboard');
    } else if (this.authService.getRole() == ROLE.TUTOR) {
      this.router.navigateByUrl('/instructor/dashboard');
    }
  }

  myProfile(): void {
    if (this.authService.getRole() == ROLE.PARTICIPANT) {
      this.router.navigateByUrl('/participant/profile');
    } else if (this.authService.getRole() == ROLE.TUTOR) {
      this.router.navigateByUrl('/instructor/profile');
    }
  }

  setting(): void {
    if (this.authService.getRole() == ROLE.PARTICIPANT) {
      this.router.navigateByUrl('/participant/setting');
    } else if (this.authService.getRole() == ROLE.TUTOR) {
      this.router.navigateByUrl('/instructor/setting');
    }
  }

  getFirstName(): void {
    this.firstName = this.user.idProfile.fullName.split(" ")[0];
  }
}
