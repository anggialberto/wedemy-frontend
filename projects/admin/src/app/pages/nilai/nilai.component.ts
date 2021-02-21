import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Grades } from '../../model/grades';
import { GradeService } from '../../service/grade.service';

@Component({
  selector: 'app-nilai',
  templateUrl: './nilai.component.html',
  styleUrls: ['./nilai.component.scss'],
  styles: []
})
export class NilaiComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  update: boolean;
  idUser: string;

  nilai = new Grades();
  listNilai: Grades[] = []

  codeValid: boolean;
  codeErrMsg: string;

  nilaiMin: boolean;
  nilaiMinErrMsg: string;

  nilaiMax: boolean;
  nilaiMaxErrMsg: string;
  loading: boolean = true;

  constructor(private auth: AuthService, private gradeService: GradeService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.idUser = auth.getUserId();
  }

  ngOnInit(): void {
    this.getNilai();
  }

  insertNilai(): void {
    console.log('insert')
    this.nilai.createdBy = this.idUser
    this.gradeService.insertGrade(this.nilai).subscribe(val => {
      this.productDialog = false;
      this.listNilai.push(this.nilai);
    });
  }

  updateNilai(): void {
    console.log('update')
    this.nilai.updatedBy = this.idUser
    this.gradeService.updateGrade(this.nilai).subscribe(val => {
      this.productDialog = false;
      this.update = false;
      this.removeNilai(this.nilai.id)
      this.listNilai.push(this.nilai)
      this.getNilai()
    });
  }

  getNilai(): void {
    this.gradeService.getGrades().subscribe(val => {
      this.listNilai = val.data;
      console.log(val); this.loading = false;
    })
  }

  editProduct(grade: Grades) {
    grade.createdAt = null;
    grade.updatedAt = null;
    this.nilai = { ...grade };
    this.productDialog = true;
    this.update = true;
  }

  deleteGrade(id: string) {
    this.confirmationService.confirm({
      message: 'Apakah anda yakin ingin menghapus data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gradeService.deleteById(id, this.idUser).subscribe(val => { this.removeNilai(id); })
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.codeValid = true;
    this.nilaiMax = true;
    this.nilaiMin = true;
  }

  openNew() {
    this.nilai = new Grades()
    this.update = false;
    this.productDialog = true;
  }

  removeNilai(id: string): void {
    this.listNilai.forEach((value, index) => {
      if (value.id == id) {
        this.listNilai.splice(index, 1);
      }
    })
  }

  validation(event: string, col: string): void {
    if (event.length == 0) {
      if (col == 'code') {
        this.codeValid = false;
        this.codeErrMsg = 'kode tidak boleh kosong'
      } else if (col == 'nilaiMin') {
        this.nilaiMin = false;
        this.nilaiMinErrMsg = 'nilai minimum tidak boleh kosong'
      } else if (col == 'nilaiMax') {
        this.nilaiMax = false;
        this.nilaiMaxErrMsg = 'nilai maksimum tidak boleh kosong'
      }
    } else {
      if (col == 'code') {
        this.codeValid = true;
      } else if (col == 'nilaiMin') {
        if (isNaN(Number(event))) {
          this.nilaiMin = false;
          this.nilaiMinErrMsg = 'tidak bisa memasukan huruf'
        } else {
          this.nilaiMin = true;
        }
      } else if (col == 'nilaiMax') {
        if (isNaN(Number(event))) {
          this.nilaiMax = false;
          this.nilaiMaxErrMsg = 'tidak bisa memasukan huruf'
        } else {
          this.nilaiMax = true;
        }
      }
    }

  }
}
