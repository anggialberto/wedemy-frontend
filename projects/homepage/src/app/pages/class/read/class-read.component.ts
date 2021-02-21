import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Classes } from '@bootcamp-homepage/models/classes';
import { DetailClasses } from '@bootcamp-homepage/models/detail-classes';
import { ClassService } from '@bootcamp-homepage/services/class.service';
import { DetailClassService } from '@bootcamp-homepage/services/detail-class.service';
import { ModuleRegistrationService } from '@bootcamp-homepage/services/module-registration.service';
import { Observable } from 'rxjs';
import { Permissions } from '@bootcamp-homepage/shared/guards/classes/permissions';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-class-read',
  templateUrl: './class-read.component.html',
  styleUrls: ['./class-read.component.css']
})
export class ClassReadComponent implements OnInit {

  searchText = '';
  listClasses: DetailClasses[] = [];
  countModule: number = 0;
  totalHours: number = 0;
  countMat: number = 0;
  loading: boolean = true;

  constructor(private router: Router,
    private dtlClassService: DetailClassService,
    private moduleRgsService: ModuleRegistrationService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dtlClassService.getAll()
      .subscribe(res => {
        this.listClasses = res.data;
        console.log(this.listClasses)
        this.listClasses.forEach(c => {
          this.dtlClassService.getInformation(c.id).subscribe(info => {
            c.totalHours = info.data.totalHours;
            c.totalModules = info.data.modules.length;
            this.showStatus(c);
            this.loading = false;
          })
        })
      });
  }

  showDetail(id: string): void {
    this.router.navigateByUrl(`/class/${id}`);
  }


  showStatus(c: DetailClasses): void{
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    let todayFormatted = new Date(this.datepipe.transform(today, 'yyyy-MM-dd'))

    let end = new Date(c.endDate);
    let start = new Date(c.startDate);
    if(todayFormatted < start) {
      c.status = 1;
      console.log("pendaftaran dibuka");
    } else if (todayFormatted >= start) {
      c.status = 2;
      console.log("telah berakhir");
    }
  }
}
