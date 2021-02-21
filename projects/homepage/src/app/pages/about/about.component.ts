import { Component, OnInit } from '@angular/core';
import { ROLE } from '@bootcamp-homepage/constants/roles';
import { ClassService } from '@bootcamp-homepage/services/class.service';
import { UserService } from '@bootcamp-homepage/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  totalParticipant: number;
  totalClass: number;
  totalTutor: number;

  constructor(
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.classService.getTotalClassAndUser().subscribe(res => {
      this.totalParticipant = res.data.totalParticipant;
      this.totalClass = res.data.totalClass;
      this.totalTutor = res.data.totalTutor;
    })
  }

}
