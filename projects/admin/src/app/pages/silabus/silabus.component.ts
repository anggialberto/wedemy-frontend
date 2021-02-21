import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modules } from '../../model/modules';
import { ModuleService } from '../../service/module.service';

@Component({
  selector: 'app-silabus',
  templateUrl: './silabus.component.html',
  styleUrls: ['./silabus.component.scss'],
  styles: []
})
export class SilabusComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  update: boolean;
  listSilabus: Modules[] = [];
  module = new Modules();
  idUser: string

  codeValid: boolean;
  codeErrMsg: string;

  nameValid: boolean;
  nameErrMsg: string;
  loading: boolean = true;

  constructor(private auth: AuthService, private moduleService: ModuleService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getModules()
    this.idUser = this.auth.getUserId()
  }

  insertModule(): void {
    console.log(this.module)
    if (this.codeValid == true && this.nameValid == true) {
      this.module.createdBy = this.idUser;
      this.moduleService.insertModules(this.module).subscribe(val => {
        this.productDialog = false;
        this.listSilabus.push(this.module)
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Data tidak valid." })

    }
  }

  updateModule(): void {
    this.module.updatedBy = this.idUser
    console.log(this.module)
    console.log('update')
    this.moduleService.updateModule(this.module).subscribe(val => {
      this.productDialog = false; this.update = false;
      this.removeSilabus(this.module.id)
      this.listSilabus.push(this.module)
      this.getModules()
    })
  }

  getModules(): void {
    this.moduleService.getModules().subscribe(val => {
      this.listSilabus = val.data;
      this.loading = false;
      console.log(val)
    })
  }

  editModule(module: Modules) {
    module.createdAt = null;
    module.updatedAt = null;
    this.module = { ...module };
    this.productDialog = true; this.update = true;
  }

  deleteModule(id: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.moduleService.deleteById(id, this.idUser).subscribe(val => { this.removeSilabus(id) })
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.codeValid = true;
    this.nameValid = true;
  }

  openNew() {
    this.module = new Modules()
    this.productDialog = true; this.update = false;
  }

  removeSilabus(id: string): void {
    this.listSilabus.forEach((value, index) => {
      if (value.id == id) {
        this.listSilabus.splice(index, 1);
      }
    })
  }

  validation(event: string, col: string): void {
    if (event.length == 0) {
      if (col == 'code') {
        this.codeValid = false;
        this.codeErrMsg = 'kode tidak boleh kosong'
      } else if (col == 'name') {
        this.nameValid = false;
        this.nameErrMsg = 'nama tidak boleh kosong'
      }
    } else {
      if (col == 'code') {
        this.codeValid = true;
      } else if (col == 'name') {
        this.nameValid = true;
      }
    }

  }
}
