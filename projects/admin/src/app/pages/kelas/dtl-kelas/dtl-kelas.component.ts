import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classes } from '@bootcamp-admin/model/classes';
import { DetailClasses } from '@bootcamp-admin/model/dtl-classes';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { ClassService } from '@bootcamp-admin/service/class.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as moment from 'moment';
import { DtlClassService } from '@bootcamp-admin/service/dtl-class.service';
import { ModuleRegistrations } from '@bootcamp-admin/model/module-registrations';
import { ModuleRegistrationService } from '@bootcamp-admin/service/module-registration.service';

@Component({
  selector: 'app-dtl-kelas',
  templateUrl: './dtl-kelas.component.html',
  styleUrls: ['./dtl-kelas.component.scss']
})
export class DtlKelasComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];

  listModuleRegs: ModuleRegistrations[] = []

  className: string;
  idUser: string;
  idDtlClass: string; loading: boolean = true;

  constructor(private dtlClassService: DtlClassService, private activateRoute: ActivatedRoute, private moduleRegService: ModuleRegistrationService, private route: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.idDtlClass = params['id']
      console.log(this.idDtlClass)
      this.getDtlClasses();
      this.getClasssName();
      this.idUser = this.auth.getUserId()
    })
  }


  getDtlClasses() {
    this.moduleRegService.getModuleRegByIdDtlClass(this.idDtlClass).subscribe(val => {
      this.listModuleRegs = val.data
      console.log(val); this.loading = false;
    })
  }

  getClasssName() {
    this.dtlClassService.getDetailClassById(this.idDtlClass).subscribe(val => {
      this.className = val.data.idClass.className
    })
  }

  // deleteClass(id: string) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.classService.deleteById(id, this.idUser).subscribe(val => { })
  //     }
  //   });
  // }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.productDialog = true;
  }

}
