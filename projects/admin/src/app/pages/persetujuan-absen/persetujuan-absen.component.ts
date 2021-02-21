import { Component, OnInit } from '@angular/core';
import { Approvements } from '@bootcamp-admin/model/approvements';
import { ApprovementService } from '@bootcamp-admin/service/approvement.service';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-persetujuan-absen',
  templateUrl: './persetujuan-absen.component.html',
  styleUrls: ['./persetujuan-absen.component.scss']
})
export class PersetujuanAbsenComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  update: boolean = false;
  listApprovements: Approvements[] = []
  approvement = new Approvements();
  idUser: string;

  codeValid: boolean;
  codeErrMsg: string;

  nameValid: boolean;
  nameErrMsg: string;
  loading: boolean = true;

  constructor(private auth: AuthService, private aprovementService: ApprovementService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.idUser = auth.getUserId()
  }

  ngOnInit(): void {
    this.getApprovements();
  }

  insertApprovement(): void {
    if (this.codeValid == true && this.nameValid == true) {
      this.approvement.createdBy = this.idUser
      this.aprovementService.insertApprovement(this.approvement).subscribe(val => {
        this.productDialog = false;
        this.listApprovements.push(this.approvement)
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Data tidak valid." })
    }
  }

  updateApprovement(): void {
    console.log('update')
    this.approvement.updatedBy = this.idUser
    this.aprovementService.updateApprovement(this.approvement).subscribe(val => {
      this.productDialog = false;
      this.update = false;
      this.removeApprovement(this.approvement.id)
      this.listApprovements.push(this.approvement)
      this.getApprovements()
    })
  }

  getApprovements(): void {
    this.aprovementService.getApprovements().subscribe(val => {
      this.listApprovements = val.data
      console.log(val); this.loading = false;
    })
  }

  editApprovement(approvement: Approvements) {
    approvement.createdAt = null;
    approvement.updatedAt = null;
    this.approvement = { ...approvement };
    this.productDialog = true; this.update = true;
  }

  deleteApprovement(id: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.aprovementService.deleteById(id, this.idUser).subscribe(val => { this.removeApprovement(id) })
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.codeValid = true;
    this.nameValid = true;
  }

  openNew() {
    this.approvement = new Approvements();
    this.productDialog = true;
    this.submitted = false; this.update = false;
  }

  removeApprovement(id: string): void {
    this.listApprovements.forEach((value, index) => {
      if (value.id == id) {
        this.listApprovements.splice(index, 1);
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
