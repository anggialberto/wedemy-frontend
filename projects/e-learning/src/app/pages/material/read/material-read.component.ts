import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { File } from '@bootcamp-elearning/models/file';
import { MaterialService } from '@bootcamp-elearning/services/material.service';
import { ROLE } from '@bootcamp-core/constants/role';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { downloadFile } from '@bootcamp-elearning/utils/download';

@Component({
  selector: 'app-material-read',
  templateUrl: './material-read.component.html',
  styleUrls: ['./material-read.component.css']
})
export class MaterialReadComponent implements OnInit {

  roleCode: string;
  roles = ROLE;

  material: any;
  idDetailModuleRegistration: string;
  idDetailClass: string;

  fileName: string;

  isLoading: boolean = true;

  constructor(private sanitizer: DomSanitizer,
    private location: Location,
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.roleCode = this.authService.getRole();
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetailModuleRegistration = params['idDtlModuleRgs'];
        this.idDetailClass = params['idDtlClass'];
        this.getMaterial();
      });
  }

  getMaterial(): void {
    this.materialService.getMaterial(this.idDetailModuleRegistration).subscribe(
      res => {
        this.material = res.data;
        console.log(res);
        this.fileName = this.material.idLearningMaterial.idFile.name;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  downloadFileFromBlob(data: File): void {
    downloadFile(data, this.fileName);
  }

  back(): void {
    console.log("Back button clicked");
    this.location.back();
  }
}
