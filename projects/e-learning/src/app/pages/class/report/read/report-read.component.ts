import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import API from '@bootcamp-core/constants/api';
import { ROLE } from '@bootcamp-core/constants/role';
import { File } from '@bootcamp-elearning/models/file';
import { ReportService } from '@bootcamp-elearning/services/report.service';
import { buildUrlBase64, createElementTagA } from '@bootcamp-elearning/utils/utils';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-report-read',
  templateUrl: './report-read.component.html',
  styleUrls: ['./report-read.component.css']
})
export class ReportReadComponent implements OnInit {
  ROLES = ROLE;
  idDetailClass: string;
  roleCode: string;
  selectedScoreReportUser: any;
  selectedCertificatedUser: any;
  isCertificateUserAvailable: boolean = false;
  isReportScoreUserAvailable: boolean = false;

  participantScores: any;
  selectedParticipantScore: any[];
  loadingParicipantScore: boolean = true;
  activityValues: number[] = [0, 100];

  participantPresences: any;
  loadingParicipantPresence: boolean = true;
  rowGroupMetadata: any;

  constructor(private route: ActivatedRoute,
    private reportService: ReportService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.roleCode = this.authService.getRole();
    this.route.params.subscribe(param => {
      this.idDetailClass = param['idDetailClass'];
      if (this.roleCode === this.ROLES.PARTICIPANT) {
        this.getScoreReport(this.authService.getUserId());
        this.getCertificate();
      } else if (this.roleCode === this.ROLES.TUTOR) {
        this.getAllScore();
        this.getAllPresence();
      }
    })
  }


  getAllScore(): void {
    this.reportService.getAllScore(this.idDetailClass).subscribe(
      res => {
        console.log(res);
        this.participantScores = res.data;
        this.loadingParicipantScore = false;
      },
      err => {
        console.log(err);
        this.loadingParicipantScore = false;
      }
    )
  }

  getAllPresence(): void {
    this.reportService.getAllPressence(this.idDetailClass).subscribe(
      res => {
        this.participantPresences = res.data;
        console.log(res);
        this.loadingParicipantPresence = false;
        this.updateRowGroupMetaData();
      },
      err => {
        console.log(err);
      }
    )
  }

  getPresenceReportByIdModuleRgs(idDtlModuleRgs: string): void {
    // let url = `${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_REPORT_DETAIL_PRESENCE_QUERY_PATH}?idDtlClass=${this.idDetailClass}&idDtlModuleRgs=${idDtlModuleRgs}`;
    // let link = createElementTagA(url);
    // link.target = '_blank';
    // link.click()
    const param = {
      idDtlClass: this.idDetailClass,
      idDtlModuleRgs: idDtlModuleRgs
    }
    this.reportService.getPresenceReportByIdModuleRegistration(param).subscribe(
      res => {
        console.log(res);
        this.downLoadFile(res, "application/pdf");
      },
      err => {
        console.log(err);
      }
    )
  }
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);

    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  getPresenceReport(): void {
    let url = `${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_REPORT_PRESENCE_QUERY_PATH}/${this.idDetailClass}`;
    let link = createElementTagA(url);
    link.target = '_blank';
    link.click();
  }

  getScoreReport(idUser: string): void {
    const param = {
      idDtlClass: this.idDetailClass,
      idParticipant: idUser
    }

    this.reportService.getDetailScore(param).subscribe(
      res => {
        console.log(res);
        this.isReportScoreUserAvailable = res.data.check;
        if (res.data.check && this.roleCode === this.ROLES.TUTOR) {

          let file: File = {
            file: res.data.out,
            type: res.data.contentType
          }
          const url = buildUrlBase64(file);
          const link = createElementTagA(url);
          link.download = res.data.fileName;
          link.click();
        } else if (res.data.check && this.roleCode === this.ROLES.PARTICIPANT) {
          this.selectedScoreReportUser = res.data;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getCertificate(): void {
    const param = {
      idUser: this.authService.getUserId(),
      idDetailClass: this.idDetailClass
    }

    this.reportService.getCertificate(param).subscribe(
      res => {
        console.log('get certificate');

        console.log(res);
        this.isCertificateUserAvailable = res.data.check;
        this.selectedCertificatedUser = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  downloadReport(data: any): void {
    let file: File = {
      file: data.out,
      type: data.contentType
    }
    const url = buildUrlBase64(file);
    const link = createElementTagA(url);
    link.download = data.fileName;
    link.click();
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.participantPresences) {
      for (let i = 0; i < this.participantPresences.length; i++) {
        let rowData = this.participantPresences[i];
        let representativeName = rowData.detailModule.idModuleRegistration.idModule.moduleName;

        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.participantPresences[i - 1];
          let previousRowGroup = previousRowData.detailModule.idModuleRegistration.idModule.moduleName;
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
  }
}
