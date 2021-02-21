import { Location } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailModuleRegistration } from '@bootcamp-elearning/models/detail-module-registration';
import { LearningMaterialType } from '@bootcamp-elearning/models/learning-material-type';
import { MaterialService } from '@bootcamp-elearning/services/material.service';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.css']
})
export class MaterialAddComponent implements OnInit {
  formData: FormData = new FormData();

  detailModuleRegistration: DetailModuleRegistration = new DetailModuleRegistration();

  materialTypes: LearningMaterialType[];

  materialCode: string;
  materialName: string;
  startDate: any;
  selectedMaterialType: LearningMaterialType;
  description: string;
  idModuleRegistration: string;

  mtrCodeErrMsg: string;
  mtrNameErrMsg: string;
  startDateErrMsg: string;
  descErrMsg: string;

  mtrCodeIsValid: boolean = true;
  mtrNameIsValid: boolean = true;
  startDateIsValid: boolean;
  descIsValid: boolean;
  fileIsValid: boolean;

  selectedFileName: any = "Pilih file";

  mtrCodeClass: string = "";
  mtrNameClass: string = "";
  startDateClass: string = "";
  descClass: string = "";

  disabledButton: boolean = true;

  constructor(private authService: AuthService,
    private location: Location,
    private materialService: MaterialService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(param => {
    //   this.idModuleRegistration = param['idModuleRegistration']
    //   console.log(param['idModuleRegistration']);
    // })
    this.route
      .queryParams
      .subscribe(params => {
        this.idModuleRegistration = params['idModuleRegistration']
      });
    this.getMaterialTypes();
  }

  getMaterialTypes(): void {
    this.materialService.getMaterialTypes().subscribe(
      res => {
        this.materialTypes = res.data;
        this.selectedMaterialType = res.data[0];
      },
      err => {
        console.log(err);
      }
    )
  }

  setFile(event: any): void {
    console.log(this.formData.get('file'));
    if (this.formData.get('file') != null) {
      this.formData.delete('file');
    }
    let fileList = event.target.files;
    if (fileList) this.formData.append('file', fileList[0]);

    this.selectedFileName = fileList[0].name;
    this.fileIsValid = true;
    console.log(this.formData.get('file'));
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.detailModuleRegistration.orderNumber = 100;
    this.detailModuleRegistration.scheduleDate = this.startDate;
    this.detailModuleRegistration.idLearningMaterial = {
      createdBy: this.authService.getUserId(),
      code: this.materialCode,
      learningMaterialName: this.materialName,
      description: this.description,
      idLearningMaterialType: {
        id: this.selectedMaterialType.id
      }
    };
    this.detailModuleRegistration.idModuleRegistration = {
      id: this.idModuleRegistration
    }

    console.log(this.detailModuleRegistration);
    if (this.formData.get('body') != null) {
      this.formData.delete('body');
    }
    this.formData.append('body', JSON.stringify(this.detailModuleRegistration));
    this.materialService.saveMaterial(this.formData).subscribe(
      res => {
        console.log(res);
        this.back();
      },
      err => {
        console.log(err);
      }
    );

  }

  mtrCodeValidation(event: string): void {
    if (event.length == 0) {
      this.mtrCodeErrMsg = "Kode materi tidak boleh kosong"
      this.mtrCodeIsValid = false;
      this.mtrCodeClass = "is-invalid"
    } else {
      this.mtrCodeIsValid = true;
      this.mtrCodeClass = ""

      if (event.length > 10) {
        this.mtrCodeErrMsg = "Maksimal 10 karakter"
        this.mtrCodeIsValid = false;
        this.mtrCodeClass = "is-invalid"

      }
    }
    this.checkDisabled();
  }

  mtrNameValidation(event: string): void {
    if (event.length == 0) {
      this.mtrNameErrMsg = "Nama materi tidak boleh kosong"
      this.mtrNameIsValid = false;
      this.mtrNameClass = "is-invalid"
    } else {
      this.mtrNameIsValid = true;
      this.mtrNameClass = ""
    }
    this.checkDisabled();
  }

  startDateValidation(event: string): void {
    if (event.length == 0) {
      this.startDateErrMsg = "Tanggal tidak boleh kosong"
      this.startDateIsValid = false;
      this.startDateClass = "is-invalid"
    } else {
      this.startDateIsValid = true;
      this.startDateClass = ""
    }
    this.checkDisabled();
  }

  descValidation(event: string): void {
    if (event == null) {
      this.descErrMsg = "Deskripsi tidak boleh kosong"
      this.descIsValid = false;
      this.descClass = "is-invalid"
    } else {
      this.descIsValid = true;
      this.descClass = ""
    }
    this.checkDisabled();
  }

  checkDisabled(): void {
    if (this.mtrCodeIsValid && this.mtrNameIsValid && this.startDateIsValid && this.descIsValid
      //&& this.fileIsValid
    ) {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }


}
