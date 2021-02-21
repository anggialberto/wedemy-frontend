import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profiles } from '@bootcamp-homepage/models/profiles';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { UserService } from '@bootcamp-homepage/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  profile: Profiles = new Profiles();
  successDialog: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  resetPassword(): void {
    this.userService.resetPassword(this.profile)
    .subscribe(res => {
      this.successDialog = true;
    })
  }

}
