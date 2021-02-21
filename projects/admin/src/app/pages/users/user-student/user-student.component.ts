import { Component, OnInit } from '@angular/core';
import { Users } from '@bootcamp-admin/model/users';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { UserService } from '@bootcamp-admin/service/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-student',
  templateUrl: './user-student.component.html',
  styleUrls: ['./user-student.component.css'],
  styles: []
})
export class UserStudentComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  listUsers: Users[] = []
  loading: boolean = true;
  idUser: string
  constructor(private auth: AuthService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getUserByCode();
    this.idUser = this.auth.getUserId()
  }

  getUserByCode(): void {
    this.userService.getUserByCode('PCP').subscribe(val => {
      this.listUsers = val.data;
      console.log(val)
      this.listUsers.forEach(res => {
        if (res.idProfile.bio == null) {
          res.idProfile.bio = "-"
        }
      })
      this.loading = false;
    })
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteById(id, this.idUser).subscribe(val => { this.removeUser(id) })
      }
    });
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }


  openNew() {
    this.productDialog = true;
  }

  removeUser(id: string): void {
    this.listUsers.forEach((value, index) => {
      if (value.id == id) {
        this.listUsers.splice(index, 1);
      }
    })
  }
}
