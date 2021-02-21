import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '@bootcamp-elearning/services/class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
})
export class ClassDetailComponent implements OnInit {
  isLoading: boolean = true;
  display: boolean = false;

  idDetailClass: string;
  class: any;


  constructor(private route: ActivatedRoute,
    private classService: ClassService) { }

  ngOnInit(): void {
    this.idDetailClass = this.route.firstChild.snapshot.params['idDetailClass'];
    this.classService.getDetail(this.idDetailClass).subscribe(
      res => {
        console.log(res);
        this.class = res.data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  showVisible(): void {
    this.display = !this.display;
  }
}
