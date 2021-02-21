import { AnimationDriver } from '@angular/animations/browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import METHOD from '@bootcamp-core/constants/method';
import { AnswerService } from '@bootcamp-elearning/services/answer.service';
import { MaterialService } from '@bootcamp-elearning/services/material.service';
import { downloadFile } from '@bootcamp-elearning/utils/download';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answer: any;

  formData: FormData = new FormData();

  idDetailModuleRegistration: string;

  fileNameSelected: string = "Pilih file";
  lastModified: string;
  material: any;
  fileName: string;
  isOverDueDate: boolean;

  lastModifiedTime: string;
  dueEndTime: string;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private answerService: AnswerService,
    private materialService: MaterialService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetailModuleRegistration = params['idDtlModuleRgs'];
        this.getAnswer();
      });
  }

  setFile(event: any): void {
    if (this.formData.get('file') != null) {
      this.formData.delete('file');
    }
    let fileList = event.target.files;
    if (fileList) this.formData.append('file', fileList[0]);
    this.fileNameSelected = fileList[0].name;
  }

  getAnswer(): void {
    let param = {
      idDtlModuleRgs: this.idDetailModuleRegistration,
      idParticipant: this.authService.getUserId()
    }

    this.answerService.getAnswer(param).subscribe(
      res => {
        console.log('Berhasil mengambil data answer');
        this.answer = res.data;
        this.getLastModified();
        this.getFileName();
        this.checkDueDate();
      },
      err => {
        console.log(err);
      }
    )
  }

  uploadAnswer(): void {
    console.log('Tombol Upload di click');

    let payload: Object;
    let method: string;
    if (this.answer.id == "Empty") {
      payload = {
        idDetailModuleRegistration: {
          id: this.idDetailModuleRegistration
        },
        idParticipant: {
          id: this.authService.getUserId()
        }
      }
      method = METHOD.POST;
    } else {
      payload = {
        idDetailModuleRegistration: {
          id: this.idDetailModuleRegistration
        },
        idParticipant: {
          id: this.authService.getUserId()
        },
        idFile: {
          id: this.answer.idFile.id
        },
        version: this.answer.version,
        id: this.answer.id
      }
      method = METHOD.PATCH;
    }

    this.formData.append('body', JSON.stringify(payload));
    console.log(this.formData.get('body'));
    this.answerService.uploadAnswer(this.formData, method).subscribe(
      res => {
        console.log(res);
        this.formData.delete('body');
        this.getAnswer();

      },
      err => {
        console.log(err);
      }
    )
  }

  getLastModified(): void {
    console.log(this.answer)

    if (this.answer.id != "Empty") {
      if (this.answer.idFile.updatedAt) {
        this.lastModified = this.answer.idFile.updatedAt;
        this.lastModifiedTime = this.lastModified.split("T")[1].split(".")[0];
      } else if (this.answer.idFile.createdAt) {
        this.lastModified = this.answer.idFile.createdAt;
        this.lastModifiedTime = this.lastModified.split("T")[1].split(".")[0];
      }
    } else {
      this.lastModified = "Kosong"
    }

  }


  getFileName(): void {
    if (this.answer.id != "Empty") {
      this.fileName = this.answer.idFile.name;
    } else {
      this.fileName = "Kosong";
    }
  }

  checkDueDate(): void {
    let now = new Date();
    let dueDate = new Date(this.answer.idDetailModuleRegistration.scheduleDate);
    let dueTime = this.answer.idDetailModuleRegistration.idModuleRegistration.idDetailClass.endTime.split(":");
    dueDate.setHours(dueTime[0]);
    dueDate.setMinutes(dueTime[1]);
    dueDate.setSeconds(0);

    this.dueEndTime = `${dueDate.toTimeString().split(" ")[0]} WIB`

    if (now > dueDate) {
      this.isOverDueDate = true;
      console.log("over due date");
    } else {
      this.isOverDueDate = false;
    }

  }

  downloadFileFromBlob(data: File): void {
    downloadFile(data, this.fileName);
  }

}
