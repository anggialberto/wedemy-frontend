import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profiles } from '@bootcamp-admin/model/profiles';
import { Roles } from '@bootcamp-admin/model/roles';
import { Users } from '@bootcamp-admin/model/users';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { UserService } from '@bootcamp-admin/service/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-tutor',
  templateUrl: './create-tutor.component.html',
  styleUrls: ['./create-tutor.component.scss']
})
export class CreateTutorComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];

  profile = new Profiles();
  user = new Users();
  role = new Roles();
  roleUser: string;

  usernameValid: boolean;
  usernameErrMsg: string;

  passwordValid: boolean;
  passErrMsg: string;

  nomorKtpValid: boolean;
  nomorKtpErrMsg: string;

  namaValid: boolean;
  namaErrMsg: string;

  alamatValid: boolean;
  alamatErrMsg: string;

  emailValid: boolean;
  emailErrMsg: string;

  numPhoneValid: boolean;
  numPhoneErrMsg: string;

  birthPlaceValid: boolean;
  birthPlaceErrMsg: string;

  birthDateValid: boolean;
  birthDateErrMsg: string;

  idUser: string
  constructor(private auth: AuthService, private messageService: MessageService, private route: Router, private userService: UserService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.roleUser = params['user']
      this.idUser = this.auth.getUserId();
    })
  }

  insertUser(): void {
    console.log(this.roleUser)

    if (this.passwordValid && this.emailValid && this.namaValid
      && this.alamatValid && this.birthDateValid && this.birthPlaceValid
      && this.nomorKtpValid && this.numPhoneErrMsg && this.emailValid) {
      if (this.roleUser == 'tutor') {
        this.role.code = 'TTR';
      } else {
        this.role.code = 'ADM';
      }

      this.user.createdBy = this.idUser
      this.user.idProfile = this.profile;
      this.user.idRole = this.role;

      console.log(this.user)
      this.userService.insertUsers(this.user).subscribe(val => {
        if (this.roleUser == 'tutor') {
          this.route.navigateByUrl('/admin/user-tutor')
        } else {
          this.route.navigateByUrl('/admin/user-admin')
        }
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Data tidak valid." })
    }
  }


  backButton() {
    if (this.roleUser == 'tutor') {
      this.route.navigateByUrl('/admin/user-tutor')
    } else {
      this.route.navigateByUrl('/admin/user-admin')
    }
  }

  validation(event: string, col: any): void {
    if (event.length == 0) {
      if (col == 'username') {
        this.usernameValid = false;
        this.usernameErrMsg = 'username tidak boleh kosong'
      } else if (col == 'email') {
        this.emailValid = false;
        this.emailErrMsg = 'email tidak boleh kosong'
      } else if (col == 'nama') {
        this.namaValid = false;
        this.namaErrMsg = 'nama tidak boleh kosong'
      } else if (col == 'alamat') {
        this.alamatValid = false;
        this.alamatErrMsg = 'alamat tidak boleh kosong'
      } else if (col == 'birthPlace') {
        this.birthPlaceValid = false;
        this.birthPlaceErrMsg = 'tempat lahir tidak boleh kosong'
      } else if (col == 'birthDate') {
        this.birthDateValid = false;
        this.birthDateErrMsg = 'tanggal lahir tidak boleh kosong'
      } else if (col == 'password') {
        this.passwordValid = false;
        this.passErrMsg = 'password tidak boleh kosong'
      }
    } else {
      if (col == 'email') {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(event)) {
          this.emailValid = false;
          this.emailErrMsg = "Alamat email tidak valid";
        } else {
          this.emailValid = true
        }
      } else if (col == 'password') {
        if (event.length < 8) {
          this.passwordValid = false;
          this.passErrMsg = 'password minimal 8 karakter'
        } else {
          this.passwordValid = true;
        }
      } else if (col == 'username') {
        if (event.length < 6) {
          this.usernameValid = false;
          this.usernameErrMsg = 'username terlalu pendek'
        } else {
          this.usernameValid = true;
        }
      } else if (col == 'nama') {
        if (event.length < 4) {
          this.namaValid = false;
          this.namaErrMsg = 'nama terlalu pendek'
        } else {
          this.namaValid = true;
        }
      } else if (col == 'alamat') {
        if (event.length < 10) {
          this.alamatValid = false;
          this.alamatErrMsg = 'alamat tidak boleh kurang dari 10 karakter'
        } else {
          this.alamatValid = true;
        }
      } else if (col == 'birthPlace') {
        if (event.length < 3) {
          this.birthPlaceValid = false;
          this.birthPlaceErrMsg = 'tempat lahir terlalu pendek'
        } else {
          this.birthPlaceValid = true;
        }
      } else if (col == 'birthDate') {
        this.birthDateValid = true;
      }
    }
  }

  phoneValidation(event: string): void {
    if (/^[0-9]*$/.test(event) && (event.length > 10 && event.length < 13)) {
      this.numPhoneValid = true;
    } else {
      this.numPhoneValid = false;
      if (!/^[0-9]*$/.test(event)) {
        this.numPhoneErrMsg = "Masukkan angka saja"
      }
      else if (event.length < 11 || event.length > 12) {
        this.numPhoneErrMsg = "Minimal 11 digit, maksimal 12 digit"
      }
    }
  }

  numIdentity(event: string): void {
    if (/^[0-9]*$/.test(event) && event.length == 16) {
      this.nomorKtpValid = true;
    } else {
      this.nomorKtpValid = false;
      if (!/^[0-9]*$/.test(event)) {
        this.nomorKtpErrMsg = "Masukkan angka saja"
      }
      else if (event.length < 16 || event.length > 16) {
        this.nomorKtpErrMsg = "Nomor identitas harus 16 angka"
      }
    }
  }

}
