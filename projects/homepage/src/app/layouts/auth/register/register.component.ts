import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { Users } from '@bootcamp-homepage/models/users';
import { ToastService } from '@bootcamp-homepage/services/toast.service';
import { UserService } from '@bootcamp-homepage/services/user.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  participant: Users = new Users();

  fullnameValid: boolean = true;
  fullnameErrorMsg: string;

  emailValid: boolean = true;
  emailErrorMsg: string;

  usernameValid: boolean = true;
  usernameErrorMsg: string;

  passwordValid: boolean = true;
  passwordErrorMsg: string;

  defaultImg = "/assets/img/profile-default"

  file: string;
  formData = new FormData();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.participant.idRole.code = ROLE.PARTICIPANT;
  }

  onSelectFile(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      let data: FormData = new FormData();
      data.append('file', file);
      this.formData = data;
      this.file = file.name;
    }

  }

  save() {

    if (this.fullnameValid && this.emailValid && this.usernameValid && this.passwordValid) {
      this.userService.insertUser(this.participant)
        .subscribe(val => {
          console.log(val);
          this.router.navigateByUrl("/auth/login")
        })
    }

  }


  fullnameValidation(event: string): void {
    if (event.length == 0) {
      this.fullnameValid = false;
      this.fullnameErrorMsg = "Nama lengkap tidak boleh kosong";
    } else {
      this.fullnameValid = true;
    }
  }

  emailValidation(event: string): void {
    if (event.length == 0) {
      this.emailValid = false;
      this.emailErrorMsg = "Email tidak boleh kosong";
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(event)) {
        this.emailValid = false;
        this.emailErrorMsg = "Alamat email tidak valid";
      } else {
        this.emailValid = true;
      }
    }
  }

  usernameValidation(event: string): void {
    if (event.length == 0) {
      this.usernameValid = false;
      this.usernameErrorMsg = "Username tidak boleh kosong";
    } else {
      if (event.length < 6) {
        this.usernameValid = false;
        this.usernameErrorMsg = 'username terlalu pendek'
      } else {
        this.usernameValid = true;
      }
    }
  }

  passwordValidation(event: string): void {
    if (event.length < 8) {
      this.passwordValid = false;
      this.passwordErrorMsg = "Password minimal 8 karakter"
    } else {
      this.passwordValid = true;
    }
  }
}
