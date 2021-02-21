import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { Users } from '@bootcamp-homepage/models/users';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { ToastService } from '@bootcamp-homepage/services/toast.service';
import { UserService } from '@bootcamp-homepage/services/user.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users = new Users();

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.user).subscribe(val => {
      this.authService.saveToken(val.token);
      this.authService.saveProfile(val.profile, this.user);
      console.log(this.authService.getRole());
      if (this.authService.getRole() == ROLE.PARTICIPANT) {
        this.router.navigateByUrl('/')
      } else if (this.authService.getRole() == ROLE.ADMIN) {
        this.router.navigateByUrl('/admin/dashboard');
      } else if (this.authService.getRole() == ROLE.TUTOR) {
        this.router.navigateByUrl('/');
      } else if (this.authService.getRole() == ROLE.SPRADMIN) {
        this.router.navigateByUrl('/admin/dashboard');
      }
    })
  }

}
