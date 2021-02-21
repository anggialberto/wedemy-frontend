import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profiles } from '@bootcamp-admin/model/profiles';
import { Users } from '@bootcamp-admin/model/users';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ProfileService } from '@bootcamp-admin/service/profile.service';
import { UserService } from '@bootcamp-admin/service/user.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.component.html',
  styleUrls: ['./pengaturan.component.scss']
})
export class PengaturanComponent implements OnInit {

  formData: FormData = new FormData();
  file: String;

  active: string;
  user: Users = new Users();
  birthDate: Date = new Date();
  profile: Profiles = new Profiles();

  idProfile: string;
  idUser: string;
  username: string;

  pass: string;
  passConf: string;

  defaultImg: string = "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
  url: any = "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";


  nomorKtpValid: boolean;
  nomorKtpErrMsg: string;

  phoneNumValid: boolean;
  phoneNumErrMsg: string;

  alamatValid: boolean;
  alamatErrMsg: string;

  birthPlaceValid: boolean;
  birthPlaceErrMsg: string;

  birthDateValid: boolean;
  birthDateErrMsg; string;

  nameValid: boolean;
  nameErrMsg: string;

  passwordValid: boolean;
  passwordErrMsg: string;

  repeatPasswordValid: boolean;
  repeatPasswordErrMsg: string;

  constructor(private messageService: MessageService, private userService: UserService, private auth: AuthService, private router: Router, private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.idProfile = this.auth.getProfileId();
    this.idUser = this.auth.getUserId();
    this.username = this.auth.getUsername();
    this.getProfile();
    this.getUser();
  }

  click(url: string) {
    this.active = url;
  }

  getProfile(): void {
    this.profileService.getProfileById(this.idProfile).subscribe(val => {
      this.profile = val.data;
      this.birthDate = new Date(val.data.birthDate)
      if (val.data.idFile.file) {
        this.url = 'data:image/png;base64,' + val.data.idFile.file
      }
    })
  }

  getUser(): void {
    this.userService.getUserById(this.idUser).subscribe(val => {
      this.user = val.data;
      this.user.idProfile = val.data.idProfile
    })
  }

  getFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file, 'heheh');
      let data: FormData = new FormData();
      data.append('file', file);
      this.formData = data;
      this.file = file.name;
    }

    if (event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  updateProfile() {
    this.profile.birthDate = this.formatDate(this.birthDate)
    this.profile.id = this.auth.getProfileId();
    this.profile.updatedBy = this.auth.getUserId();

    this.formData.append("body", JSON.stringify(this.profile));
    this.profileService.updateProfile(this.formData).subscribe(val => {
      this.getProfile()
      this.formData.delete("body");
    })
  }

  updatePassword(): void {
    if (this.pass != this.passConf) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Password tidak sama" })
    } else {
      this.user.userPassword = this.pass
      this.userService.updateUser(this.user).subscribe(val => { })
    }
  }

  formatDate(str: Date): string {
    let format = moment(str).format('YYYY-MM-DD');
    return format;
  }

  phoneValidation(event: string): void {
    if (/^[0-9]*$/.test(event) && (event.length > 10 && event.length < 13)) {
      this.phoneNumValid = true;
    } else {
      this.phoneNumValid = false;
      if (!/^[0-9]*$/.test(event)) {
        this.phoneNumErrMsg = "Masukkan angka saja"
      }
      else if (event.length < 11 || event.length > 12) {
        this.phoneNumErrMsg = "Minimal 11 digit, maksimal 12 digit"
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

  validation(event: string, col: string) {
    if (event.length == 0) {
      if (col == 'nama') {
        this.nameValid = false;
        this.nameErrMsg = 'nama tidak boleh kosong'
      } else if (col == 'alamat') {
        this.alamatValid = false;
        this.alamatErrMsg = 'alamat tidak boleh kosong'
      } else if (col == 'birthPlace') {
        this.birthPlaceValid = false;
        this.birthPlaceErrMsg = 'tempat lahir tidak boleh kosong'
      } else if (col == 'birthDate') {
        this.birthDateValid = false;
        this.birthDateErrMsg = 'tanggal lahir tidak boleh kosong'
      } else if (col == 'confPass') {
        this.repeatPasswordValid = false;
        this.repeatPasswordErrMsg = 'password tidak boleh kosong'
      }
    } else {
      if (col == 'pass') {
        if (event.length < 8) {
          this.passwordValid = false;
          this.passwordErrMsg = 'password minimal 8 karakter'
        } else {
          this.pass = event;
          this.passwordValid = true;
        }
      } else if (col == 'passConf') {
        if (event != this.pass) {
          this.repeatPasswordValid = false;
          this.repeatPasswordErrMsg = 'password tidak sama'
        } else {
          this.repeatPasswordValid = true;
        }
      } else if (col == 'nama') {
        if (event.length < 4) {
          this.nameValid = false;
          this.nameErrMsg = 'nama terlalu pendek'
        } else {
          this.nameValid = true;
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
}
