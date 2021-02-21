import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@bootcamp-elearning/models/user';
import { ProfileService } from '@bootcamp-elearning/services/profile.service';
import { UserService } from '@bootcamp-elearning/services/user.service';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myAccount: User = new User();
  displayMaximizable: boolean;
  defaultImg: string = "/assets/img/profile-default.jpeg";
  url: any = "/assets/img/profile-default.jpeg";
  uploadForm: FormGroup;
  formData = new FormData();
  file: String;

  phoneIsValid: boolean;
  phoneErrMsg: string;

  ktpIsValid: boolean;
  ktpErrMsg: string;

  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private profileService: ProfileService,
    private datepipe: DatePipe,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserId()).subscribe(res => {
      console.log(res.data);
      this.myAccount = res.data;
      this.isLoading = false;
    })
  }

  showMaximizableDialog() {
    if (this.myAccount.idProfile.idFile.file) {
      this.url = 'data:image/png;base64,' + this.myAccount.idProfile.idFile.file
    }
    this.displayMaximizable = true;
    console.log(this.myAccount.idProfile.version)
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

    if (event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  onSubmit() {
    if (this.myAccount.idProfile.birthDate) {
      let birthDateFormatted = this.datepipe.transform(this.myAccount.idProfile.birthDate, 'yyyy-MM-dd')
      this.myAccount.idProfile.birthDate = birthDateFormatted.toString();
    }
    this.myAccount.idProfile.updatedBy = this.authService.getUserId();

    this.formData.append('body', JSON.stringify(this.myAccount.idProfile));
    console.log(this.formData.get('body'))
    this.profileService.updateProfile(this.formData).subscribe(res => {
      this.myAccount.idProfile = res.data;
      this.displayMaximizable = false;
      this.formData.delete('body');
      this.ngOnInit();
    })
  }


  phoneValidation(event: string): void {
    if (/^[0-9]*$/.test(event) && (event.length > 10 && event.length < 13)) {
      this.phoneIsValid = true;
    } else {
      this.phoneIsValid = false;
      if (!/^[0-9]*$/.test(event)) {
        this.phoneErrMsg = "Masukkan angka saja"
      }
      else if (event.length < 11 || event.length > 12) {
        this.phoneErrMsg = "Minimal 11 digit, maksimal 12 digit"
      }
    }
  }

  numIdentity(event: string): void {
    if (/^[0-9]*$/.test(event) && event.length == 16) {
      this.ktpIsValid = true;
    } else {
      this.ktpIsValid = false;
      if (!/^[0-9]*$/.test(event)) {
        this.ktpErrMsg = "Masukkan angka saja"
      }
      else if (event.length < 16 || event.length > 16) {
        this.ktpErrMsg = "Nomor identitas harus 16 angka"
      }
    }
  }

}
