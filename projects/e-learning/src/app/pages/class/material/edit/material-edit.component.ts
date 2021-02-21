import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { DetailModuleRegistration } from '@bootcamp-elearning/models/detail-module-registration';
import { LearningMaterialType } from '@bootcamp-elearning/models/learning-material-type';
import { MaterialService } from '@bootcamp-elearning/services/material.service';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {
  formData: FormData = new FormData();

  material: any;

  detailModuleRegistration: DetailModuleRegistration = new DetailModuleRegistration();

  materialTypes: LearningMaterialType[];

  materialCode: string;
  materialName: string;
  startDate: any;
  selectedMaterialType: any;
  description: string;
  idDetailModuleRegistration: string;

  selectedFileName: string;

  mtrCodeErrMsg: string;
  mtrNameErrMsg: string;
  startDateErrMsg: string;
  descErrMsg: string;

  mtrCodeIsValid: boolean = true;
  mtrNameIsValid: boolean = true;
  startDateIsValid: boolean = true;
  descIsValid: boolean = true;
  fileIsValid: boolean;

  mtrCodeClass: string = "";
  mtrNameClass: string = "";
  startDateClass: string = "";
  descClass: string = "";

  disabledButton: boolean = false;
  isLoading: boolean = true;

  constructor(private authService: AuthService,
    private location: Location,
    private materialService: MaterialService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetailModuleRegistration = params['idDetailModuleRegistration']

        this.formData.append('file', null);
        this.getMaterial();
      });

    // this.route.params.subscribe(param => {
    //   this.idDetailModuleRegistration = param['idDetailModuleRegistration'];
    //   console.log('InI Detail module');

    //   console.log(this.idDetailModuleRegistration)
    //   this.formData.append('file', null);
    //   this.getMaterial();
    // })
  }

  getMaterial(): void {
    this.materialService.getMaterial(this.idDetailModuleRegistration).subscribe(
      res => {
        this.material = this.transformModelToRequired(res.data);
        console.log(res);

        if (res.data.idLearningMaterial.idFile) {
          this.selectedFileName = res.data.idLearningMaterial.idFile.name;
          this.fileIsValid = true;
        } else {
          this.selectedFileName = "Kosong";
          this.fileIsValid = false;
        }

        this.getMaterialTypes();
      },
      err => {
        console.log(err);
      }
    )
  }

  getMaterialTypes(): void {
    this.materialService.getMaterialTypes().subscribe(
      res => {
        this.materialTypes = res.data;
        this.selectedMaterialType = res.data.filter(val => {
          return val.id === this.material.idLearningMaterial.idLearningMaterialType.id;
        })[0];
        this.isLoading = false;

      },
      err => {
        console.log(err);
      }
    )
  }

  setFile(event: any): void {
    if (this.formData.get('file') != null) {
      this.formData.delete('file');
    }
    let fileList = event.target.files;
    if (fileList) this.formData.append('file', fileList[0]);

    this.selectedFileName = fileList[0].name;
  }

  getFileName(): void {
    console.log(this.material);

  }

  back(): void {
    this.location.back();
  }

  transformModelToRequired(model: any): any {
    let idLearningMaterial = model.idLearningMaterial;
    const newModel = {
      id: this.idDetailModuleRegistration,
      orderNumber: model.orderNumber,
      scheduleDate: model.scheduleDate,
      version: model.version,
      idLearningMaterial: {
        id: idLearningMaterial.id,
        createdBy: this.authService.getUserId(),
        code: idLearningMaterial.code,
        learningMaterialName: idLearningMaterial.learningMaterialName,
        description: idLearningMaterial.description,
        version: idLearningMaterial.version,
        idFile: {
          id: idLearningMaterial.idFile.id,
          version: idLearningMaterial.idFile.version
        },
        idLearningMaterialType: {
          id: idLearningMaterial.idLearningMaterialType.id
        }
      }

    }
    return newModel;
  }

  update(): void {
    // this.detailModuleRegistration.orderNumber = 100;
    // this.detailModuleRegistration.version = 0;
    // this.detailModuleRegistration.scheduleDate = this.startDate;
    // this.detailModuleRegistration.idLearningMaterial = {
    //   createdBy: this.authService.getUserId(),
    //   code: this.materialCode,
    //   learningMaterialName: this.materialName,
    //   description: this.description,
    //   idLearningMaterialType: {
    //     id: this.selectedMaterialType.id
    //   }
    // };
    // this.detailModuleRegistration.idModuleRegistration = {
    //   id: this.idModuleRegistration
    // }

    // console.log(this.detailModuleRegistration);
    console.log("hai");
    if (this.mtrCodeIsValid && this.mtrNameIsValid && this.startDateIsValid && this.descIsValid) {
      if (this.formData.get('body') != null) {
        this.formData.delete('body');
      }
      this.formData.append('body', JSON.stringify(this.material));
      console.log(this.formData.get('file'))

      console.log(this.formData.get('body'))

      this.materialService.updateMaterial(this.formData).subscribe(
        res => {
          console.log(res);
          this.back();
        },
        err => {
          console.log(err);
        }
      );
    }
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
    console.log(this.disabledButton);
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
    if (this.mtrCodeIsValid && this.mtrNameIsValid && this.startDateIsValid && this.descIsValid && this.fileIsValid) {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }
}
