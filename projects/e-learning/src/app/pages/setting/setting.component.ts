import { Component, OnInit } from '@angular/core';
import { User } from '@bootcamp-elearning/models/user';
import { UserService } from '@bootcamp-elearning/services/user.service';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  displayUsername: boolean;
  displayPassword: boolean;

  pwNow: string;
  pwNew: string;
  pwNewConfirm: string;

  pwNowIsValid: boolean;
  pwNewIsValid: boolean;
  pwNewConfirmIsValid: boolean;

  pwNowMsg: string;
  pwNewMsg: string;
  pwNewConfirmMsg: string;

  usernameNew: string;
  usernameNewIsValid: boolean;
  usernameNewMsg: string;

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserId())
    .subscribe(res => {
      this.user = res.data;
    });
  }

  showUsernameDialog(): void {
    this.displayUsername = true;
  }

  showPasswordDialog(): void {
    this.displayPassword = true;
  }

  pwNowValidation(event: string): void {
    if (event.length > 0) {
      this.pwNowIsValid = true;
    } else {
      this.pwNowIsValid = false;
      this.pwNowMsg = "Kata sandi tidak boleh kosong"
    }
  }

  pwNewValidation(event: string): void {
    if (event.length >= 8) {
      this.pwNewIsValid = true;
    } else {
      this.pwNewIsValid = false;

      if (event.length == 0) {
        this.pwNewMsg = "Kata sandi tidak boleh kosong"
      } else {
        this.pwNewMsg = "Kata sandi minimal 8 karakter"
      }
    }
  }

  pwNewConfirmValidation(event: string): void {
    if (this.pwNew == event) {
      this.pwNewConfirmIsValid = true;
    } else {
      this.pwNewConfirmIsValid = false;

      if (event.length == 0) {
        this.pwNewConfirmMsg = "Kata sandi tidak boleh kosong"
      } else {
        this.pwNewConfirmMsg = "Kata sandi tidak cocok"
      }
    }
  }

  usernameNewValidation(event: string): void {
    if (event.length == 0) {
      this.usernameNewIsValid = false;
      this.usernameNewMsg = "Nama pengguna tidak boleh kosong"
    } else {
      this.pwNewConfirmIsValid = true;
      
      if (/\s/.test(event)){
        this.usernameNewIsValid = false;
        this.usernameNewMsg = "Nama pengguna tidak boleh mengandung spasi"
      }
    }
  }

  changeUsername(): void {
    this.user.username = this.usernameNew;
    this.user.updatedBy = this.authService.getUserId();
    this.userService.updateUser(this.user).subscribe(res => {
      console.log(res.data);
      this.user = res.data;
    })
  }

  changePassword(): void {
    let userCheck: User = new User();
    userCheck.username = this.user.username;
    userCheck.userPassword = this.pwNow;
    this.userService.login(userCheck).subscribe(val => {
      this.user.userPassword = this.pwNew;
      this.user.updatedBy = this.authService.getUserId();
      this.userService.updateUser(this.user).subscribe(res => {
      console.log(res.data);
      this.user = res.data;
    })
    });
    
  }
}
