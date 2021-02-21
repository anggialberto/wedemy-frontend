import { Component, OnInit } from '@angular/core';
import { DetailClasses } from '@bootcamp-admin/model/dtl-classes';
import { DtlClassService } from '@bootcamp-admin/service/dtl-class.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClassService } from '../../service/class.service';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kelas',
  templateUrl: './kelas.component.html',
  styleUrls: ['./kelas.component.scss'],
  styles: [`:host ::ng-deep .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;}`]
})
export class KelasComponent implements OnInit {

  productDialog: boolean;
  rangeDates: Date[];
  submitted: boolean;
  statuses: any[];
  selectedClass: DetailClasses[] = []
  listKelas: DetailClasses[] = [];
  isActive: boolean;

  kelas: DetailClasses = new DetailClasses();
  idUser: string; loading: boolean = true;

  constructor(private route: Router, private classService: ClassService, private auth: AuthService, private dtlClsService: DtlClassService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.idUser = auth.getUserId()
  }

  ngOnInit(): void {
    this.getClasses();
    this.isActive = true;
  }

  getClasses() {
    this.dtlClsService.getDetailClasses().subscribe(val => {
      this.listKelas = val.data;
      console.log(val); this.loading = false;
    })
  }

  editClass(kelas: DetailClasses) {
    kelas.createdAt = null;
    kelas.updatedAt = null;
    this.kelas = { ...kelas };

    this.dtlClsService.getDetailClassById(kelas.id).subscribe(val => {
      this.route.navigateByUrl(`admin/kelas/${val.data.idClass.id}`);
    })
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

  createKelas() {
    this.route.navigateByUrl(`admin/kelas/${'create'}`);
  }

  viewDtlClass(idClass: string) {
    this.route.navigateByUrl(`admin/kelas-detail/${idClass}`)
  }
}
