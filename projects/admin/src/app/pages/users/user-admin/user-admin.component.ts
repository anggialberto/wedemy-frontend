import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Users } from '../../../model/users';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
  styles: []
})
export class UserAdminComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  user: Users;
  listUsers: Users[] = [];
  isSuperAdmin: boolean;

  idUser: string
  loading: boolean = true;
  constructor(private auth: AuthService, private route: Router, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getUserByCode();
    this.idUser = this.auth.getUserId()
    if (this.auth.getRole() == 'ADM') {
      this.isSuperAdmin = false;
    } else {
      this.isSuperAdmin = true;
    }
  }

  createAdmin() {
    this.route.navigateByUrl(`/admin/create/${'admin'}`)
  }

  getUserByCode(): void {
    this.userService.getUserByCode('ADM').subscribe(val => {
      this.listUsers = val.data;
      this.listUsers.forEach(res => {
        if (res.idProfile.bio == null) {
          res.idProfile.bio = "-"
        }
      })
      this.loading = false;
      console.log(val)
    })
  }

  deleteUser(id: string) {
    console.log(this.idUser)
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteById(id, this.idUser).subscribe(val => { this.removeUser(id) })
      }
    });
  }

  editProduct(user: Users) {
    this.user = { ...user };
    this.productDialog = true;
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
