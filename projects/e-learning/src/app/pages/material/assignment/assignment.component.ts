import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@bootcamp-elearning/services/assignment.service';
import { downloadFile } from '@bootcamp-elearning/utils/download';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  idDetailModuleRegistration: string;
  idDetailClass: string;

  assignments: any[];

  selectedAssignment: any[];
  loading: boolean = true;


  constructor(private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetailModuleRegistration = params['idDtlModuleRgs'];
        this.idDetailClass = params['idDtlClass'];
        this.getScoreAssignment();
      });
  }

  getScoreAssignment(): void {
    let param = {
      idDtlClass: this.idDetailClass,
      idDtlModuleRgs: this.idDetailModuleRegistration
    }
    this.assignmentService.getAssigment(param).subscribe(
      res => {
        this.assignments = res.data;
        this.loading = false;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  refactorModelScore(model: any[]): any[] {
    let refactModelNewScore = [];
    let refactModelUpdateScore = [];
    model.forEach(val => {
      if (val.idAssignmentSubmission.id !== 'Empty') {
        if (val.id === 'Empty') {
          refactModelNewScore.push({
            id: val.id,
            idAssignmentSubmission: {
              id: val.idAssignmentSubmission.id,
              idDetailModuleRegistration: {
                id: this.idDetailModuleRegistration
              },
              idParticipant: {
                id: val.idAssignmentSubmission.idParticipant.id
              }
            },
            createdBy: this.authService.getUserId(),
            version: val.version,
            score: Number(val.score)
          })
        } else {
          refactModelUpdateScore.push({
            id: val.id,
            idAssignmentSubmission: {
              id: val.idAssignmentSubmission.id,
              idDetailModuleRegistration: {
                id: this.idDetailModuleRegistration
              },
              idParticipant: {
                id: val.idAssignmentSubmission.idParticipant.id
              }
            },
            createdBy: this.authService.getUserId(),
            version: val.version,
            score: Number(val.score)
          })
        }

      }
    })
    console.log('new score');
    console.log(refactModelNewScore);
    console.log('update score');
    console.log(refactModelUpdateScore);
    return [refactModelNewScore, refactModelUpdateScore];
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    console.log(event);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChangeScore(event): void {
    this.assignments = this.assignments.map(element => {
      if (element.idAssignmentSubmission.idParticipant.id
        === event.idAssignmentSubmission.idParticipant.id) {
        console.log(event.score);
        let score = Number(event.score);
        if (score < 0) {
          console.log('kurang dari 0');

          element.score = 0;
        }
        if (score > 100) {
          console.log('Lebih dari 100');

          element.score = 100;
        }
      }
      return element;
    })
    console.log(this.assignments);

  }

  check(): void {
    this.refactorModelScore(this.assignments);
  }

  setAssignmentScore(): void {
    let res = this.refactorModelScore(this.assignments);
    this.assignmentService.setScoreAssignment(res[0], res[1]).subscribe(
      res => {
        console.log(res);
        this.refresh();
      },
      err => {
        console.log(err);
      }
    )
  }

  downloadFileFromBlob(data: File, fileName): void {
    downloadFile(data, fileName);
  }

  refresh(): void {
    this.loading = true;
    this.getScoreAssignment();
  }

}
