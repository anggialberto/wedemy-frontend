import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubmissionStatus } from '../../model/submission-status';
import { SubmissionStatusService } from '../../service/submission-status.service';

@Component({
  selector: 'app-status-tugas',
  templateUrl: './status-tugas.component.html',
  styleUrls: ['./status-tugas.component.scss'],
  styles: []
})
export class StatusTugasComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  update: boolean;
  listStatusTugas: SubmissionStatus[] = [];
  statusTugas = new SubmissionStatus();
  idUser: string;

  codeValid: boolean;
  codeErrMsg: string;

  nameValid: boolean;
  nameErrMsg: string;
  loading: boolean = true;
  constructor(private auth: AuthService, private submissionStatusService: SubmissionStatusService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getSubmissionStatus();
    this.idUser = this.auth.getUserId()
  }

  insertSubmissionStatus() {
    if (this.codeValid == true && this.nameValid == true) {
      this.statusTugas.createdBy = this.idUser
      this.submissionStatusService.insertSubmissionStatus(this.statusTugas).subscribe(val => {
        this.productDialog = false;
        this.listStatusTugas.push(this.statusTugas);

      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Data tidak valid." })
    }
  }

  updateSubmissionStatus() {
    console.log('update')
    this.statusTugas.updatedBy = this.idUser
    this.submissionStatusService.updateSubmissionStatus(this.statusTugas).subscribe(val => {
      this.productDialog = false; this.update = false;
      this.removeStatusTugas(this.statusTugas.id)
      this.listStatusTugas.push(this.statusTugas)
      this.getSubmissionStatus()
    })
  }

  getSubmissionStatus() {
    this.submissionStatusService.getSubmissionStatus().subscribe(val => {
      this.listStatusTugas = val.data; this.loading = false;
      console.log(val)
    })
  }

  editSubStatus(statusTugas: SubmissionStatus) {
    statusTugas.createdAt = null;
    statusTugas.updatedAt = null;
    this.statusTugas = { ...statusTugas };
    this.productDialog = true; this.update = true;
  }

  deleteSubmissionStatus(id: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submissionStatusService.deleteById(id, this.idUser).subscribe(val => { this.removeStatusTugas(id) })
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.codeValid = true;
    this.nameValid = true;
  }


  openNew() {
    this.statusTugas = new SubmissionStatus();
    this.productDialog = true; this.update = false;
  }

  removeStatusTugas(id: string): void {
    this.listStatusTugas.forEach((value, index) => {
      if (value.id == id) {
        this.listStatusTugas.splice(index, 1);
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
