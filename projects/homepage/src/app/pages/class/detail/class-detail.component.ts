import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '@bootcamp-admin/service/role.service';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { RegisterComponent } from '@bootcamp-homepage/layouts/auth/register/register.component';
import { ClassEnrollments } from '@bootcamp-homepage/models/class-enrollments';
import { Classes } from '@bootcamp-homepage/models/classes';
import { DetailClasses } from '@bootcamp-homepage/models/detail-classes';
import { ModuleRegistrations } from '@bootcamp-homepage/models/module-registrations';
import { Modules } from '@bootcamp-homepage/models/modules';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { ClassEnrollmentService } from '@bootcamp-homepage/services/class-enrollment.service';
import { ClassService } from '@bootcamp-homepage/services/class.service';
import { DetailClassService } from '@bootcamp-homepage/services/detail-class.service';
import { ModuleRegistrationService } from '@bootcamp-homepage/services/module-registration.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  
  searchText = '';
  listModules: ModuleRegistrations[] = [];
  dtlClass: DetailClasses = new DetailClasses();
  param: string = "";
  countModule: number = 0;
  totalHours: number = 0;
  countMat: number = 0;
  isLoggedOut: boolean;
  display: boolean = false;
  confirm: boolean = false;
  classEnrollmentSelected: ClassEnrollments = new ClassEnrollments();
  enrolled: boolean = false; /* To check if participant is already enrolled the class */
  showRegisterButton: boolean = false; 
  
  isEnrolled: boolean = false;
  isEnded: boolean = false;
  isFull: boolean = false;
  isTutor: boolean = false;

  defaultImg: string = "/assets/img/profile-default.jpeg";

  loading: boolean = true;

  constructor(private router: Router,
    private moduleRgsService: ModuleRegistrationService,
    private dtlClassService: DetailClassService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public datepipe: DatePipe,
    private classEnrollmentService: ClassEnrollmentService) 
  { }

  ngOnInit(): void {
    this.isLoggedOut = !this.authService.getToken();
    this.route.params.subscribe(params => {
      this.param = params['idClass'];
      this.dtlClassService.getInformation(this.param).subscribe(val => {
        this.dtlClass = val.data.detailClass;
        this.listModules = val.data.modules;
        this.dtlClass.totalModules = this.listModules.length;
        this.totalHours = val.data.totalHours;
        this.dtlClass.totalParticipant = val.data.totalParticipant;
        this.checkQuota();
        this.checkEnded();
        this.checkEnrolled();
        this.checkTutor();
        this.checkRegis();
        this.loading = false;
      })
    });
  }

  countTotalMats(): void{
    this.moduleRgsService.getModuleAndLearningMaterialsByIdDtlClass(this.param)
    .subscribe(res => {
      res.data.forEach(module => {
        module.learningMaterials.forEach(m => this.countMat++);
      })
      this.countTotalHours(this.dtlClass.endTime, this.dtlClass.startTime);
    })
  }

  countTotalHours(endTime: any, startTime: any): void{
    let end = endTime.split(':');
    let endMnt = end[0]*60 + end[1]*1;
    let start = startTime.split(':');
    let startMnt = start[0]*60 + start[1]*1;
    let diff = endMnt-startMnt;
    this.totalHours = this.countMat*(diff/60);
  }

  enrollNow(): void {
    if(this.isLoggedOut){
      this.display = true;
    } else if(!this.isLoggedOut){
      this.confirm = true;
    }
  }

  enrollClass(): void {
    this.classEnrollmentSelected.createdBy = this.authService.getUserId();
    this.classEnrollmentSelected.idDetailClass.id = this.dtlClass.id; 
    this.classEnrollmentSelected.idUser.id = this.authService.getUserId();
    this.classEnrollmentService.insertClassEnrollment(this.classEnrollmentSelected)
    .subscribe(res => {
      console.log(res);
      this.closeDialog();
      this.isEnrolled = true;
      this.showRegisterButton = false;
      this.isTutor = false;
      this.isFull = false;
      this.isEnded = false;
    })
  }

  closeDialog(): void {
    this.confirm = false;
    this.display = false;
  }

  checkEnrolled(): void {
    let idUser: string = this.authService.getUserId();
    let idDtlClass: string = this.dtlClass.id;
    if (idUser != null){
    this.classEnrollmentService.findClassEnrollment(idDtlClass, idUser)
    .subscribe(res => {
      if (res.data != null){
        this.isEnrolled = true;
        this.showRegisterButton = false;
        this.isEnded = false;
        this.isFull = false;
        this.isTutor = false;
      }
    });
  }
    this.isEnrolled = false;
  }

  checkEnded(): void {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    let todayFormatted = new Date(this.datepipe.transform(today, 'yyyy-MM-dd'))

    let end = new Date(this.dtlClass.endDate);
    let start = new Date(this.dtlClass.startDate);

    if(todayFormatted < start) {
      this.isEnded = false;
    } else if (todayFormatted >= start) {
      this.isEnded = true;
      this.showRegisterButton = false;
      this.isEnrolled = false;
      this.isFull = false;
      this.isTutor = false;
    }
  }

  checkQuota(): void {
    let quotaClass = this.dtlClass.idClass.quota;
    let totalParticipant = this.dtlClass.totalParticipant;

    if(totalParticipant >= quotaClass) {
      this.isFull = true;
      this.showRegisterButton = false;
      this.isEnrolled = false;
      this.isEnded = false;
      this.isTutor = false;
    } else if (totalParticipant < quotaClass) {
      this.isFull = false;
    }
  }

  classDashboard(): void {
    this.router.navigateByUrl(`/participant/class/enrolled/${this.dtlClass.id}`);
  }

  checkTutor(): void {
    if (this.authService.getRole() == ROLE.TUTOR) {
      this.isTutor = true;
      this.isFull = false;
      this.showRegisterButton = false;
      this.isEnrolled = false;
      this.isEnded = false;
    }
  }

  checkRegis(): void {
    if(this.isLoggedOut){
      this.showRegisterButton = true;
      this.isTutor = false;
      this.isFull = false;
      this.isEnrolled = false;
      this.isEnded = false;
    } else if(!this.isEnrolled && !this.isFull && !this.isLoggedOut && !this.isTutor && !this.isEnded){
      this.showRegisterButton = true;
      this.isTutor = false;
      this.isFull = false;
      this.isEnrolled = false;
      this.isEnded = false;
    } 
  }
}
