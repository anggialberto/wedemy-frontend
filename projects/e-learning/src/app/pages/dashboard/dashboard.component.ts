import { Component, OnInit } from '@angular/core';
import { ROLE } from '@bootcamp-core/constants/role';
import { DashboardService } from '@bootcamp-elearning/services/dashboard.service';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  query: string = '';
  classes: any[] = [];
  instructors: any[] = [];
  isLoading: boolean = true;

  results: any[] = [];
  selectedInstructor = 'Semua';

  ROLES = ROLE;
  myRole: string;

  defaultImg: string = "/assets/img/profile-default.jpeg";

  constructor(private dashboardService: DashboardService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getMyClass();
  }

  getMyClass(): void {
    let userId: string = this.authService.getUserId();
    let rolecode: string = this.authService.getRole();
    this.myRole = rolecode;
    this.dashboardService.getMyClass(userId, rolecode).subscribe(
      res => {
        // setTimeout(() => {
        // }, 2000)
        this.classes = res.data;
        this.results = res.data;
        this.isLoading = false;
        this.getUniqueInstructor();
        console.log(res);
      },
      err => { console.log(err) }
    )
  }

  getUniqueInstructor(): void {
    console.log('Classes Data');

    console.log(this.classes);

    // const uniqueInstructors = this.classes.filter((val, i, arr) => {
    //   return arr.indexOf(
    //     arr.find(item =>
    //       item
    //         .idDetailClass
    //         .idClass
    //         .idTutor
    //         .idProfile
    //         .fullName === val
    //           .idDetailClass
    //           .idClass
    //           .idTutor
    //           .idProfile
    //         .fullName
    //     )
    //   ) === i;
    // })

    // const [{
    //   idDetailClass: {
    //     idClass: { idTutor }
    //   }
    // }] = uniqueInstructors
    // console.log('Unique Instructor');
    // console.log(idTutor);

    // this.instructors = idTutor;
    // console.log('getUniqueInstructor');

    const uniqueInstructors = [...new Set(this.classes.map(item => item.idClass
      .idTutor
      .idProfile.fullName))];
    console.log(uniqueInstructors);
    this.instructors = uniqueInstructors;
    // const uniqueInstructors = [];
    // const tmp = new Map();
    // for(const item of this.classes) {
    //   if(!tmp.has(item)) { 
    //     tmp.set(item.idDetailclass)
    //   }
    // }


  }

  search(): void {
    this.results = this.classes.filter((item) => {
      if (this.selectedInstructor == 'Semua') {
        return item
          .idClass
          .className
          .toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      } else {
        return item
          .idClass
          .className
          .toLowerCase().indexOf(this.query.toLowerCase()) !== -1
          && item.idClass.idTutor
            .idProfile
            .fullName.toLowerCase().indexOf(this.selectedInstructor.toLowerCase()) !== -1;
      }
    })
  }

  counter(n: number): any[] {
    return new Array(n);
  }
}
