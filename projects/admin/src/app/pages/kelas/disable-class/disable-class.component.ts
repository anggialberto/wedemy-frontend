import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '@bootcamp-admin/model/classes';
import { DetailClasses } from '@bootcamp-admin/model/dtl-classes';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ClassService } from '@bootcamp-admin/service/class.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as moment from 'moment';
import { DtlClassService } from '@bootcamp-admin/service/dtl-class.service';

@Component({
  selector: 'app-disable-class',
  templateUrl: './disable-class.component.html',
  styleUrls: ['./disable-class.component.scss'],
  styles: [`:host ::ng-deep .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;}`]
})
export class DisableClassComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  endTimeValue: string;
  startTimeValue: string;

  selectedClass: Classes[] = []
  listKelas: Classes[] = [];
  isActive: boolean;

  kelas: Classes = new Classes();
  dtlClass: DetailClasses = new DetailClasses();
  idUser: string; loading: boolean = true;

  constructor(private dtlClassService: DtlClassService, private route: Router, private classService: ClassService, private auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.idUser = auth.getUserId()
  }

  ngOnInit(): void {
    this.getClasses();
    this.isActive = true;
  }

  onSelectEnd($event) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();

    if (hour < 10) {
      if (min < 10) {
        this.endTimeValue = `0${hour}:0${min}`;
      } else {
        this.endTimeValue = `0${hour}:${min}`;
      }
    } else {
      if (min < 10) {
        this.endTimeValue = `${hour}:0${min}`;
      } else {
        this.endTimeValue = `${hour}:${min}`;
      }
    }
  }

  onSelectStart($event) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();

    if (hour < 10) {
      if (min < 10) {
        this.startTimeValue = `0${hour}:0${min}`;
      } else {
        this.startTimeValue = `0${hour}:${min}`;
      }
    } else {
      if (min < 10) {
        this.startTimeValue = `${hour}:0${min}`;
      } else {
        this.startTimeValue = `${hour}:${min}`;
      }
    }
  }

  formatDate(str: Date): string {
    let format = moment(str).format('YYYY-MM-DD');
    return format;
  }

  getClasses() {
    this.classService.getClassInactive().subscribe(val => {
      this.listKelas = val.data;
      console.log(val); this.loading = false;
    })
  }

  save(): void {
    console.log(this.kelas)
    this.dtlClass.idClass = this.kelas;
    this.dtlClass.startTime = this.startTimeValue;
    this.dtlClass.endTime = this.endTimeValue;
    this.dtlClass.startDate = this.formatDate(this.rangeDates[0]);
    this.dtlClass.endDate = this.formatDate(this.rangeDates[1]);

    console.log(this.dtlClass.startTime, this.dtlClass.startDate, this.dtlClass.endDate, this.dtlClass.endTime)
    console.log(this.dtlClass)

    if (this.startTimeValue > this.endTimeValue) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Jam berakhir tidak boleh lebih awal" })
    } else {
      this.dtlClassService.updateInactiveClass(this.dtlClass).subscribe(val => {
        this.removeClass(this.dtlClass.idClass.id)
        this.productDialog = false;
        this.startTimeValue = "";
        this.endTimeValue = "";
        this.rangeDates = [];
      })
    }
  }

  deleteClass(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.classService.deleteById(id, this.idUser).subscribe(val => { })
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

  activateClass(kelas: Classes) {
    kelas.createdAt = null;
    kelas.updatedAt = null;
    this.kelas = { ...kelas }
    this.productDialog = true;
  }

  removeClass(id: string): void {
    this.listKelas.forEach((value, index) => {
      if (value.id == id) {
        this.listKelas.splice(index, 1);
      }
    })
  }


}
