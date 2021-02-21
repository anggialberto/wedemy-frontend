import { Component, OnInit } from '@angular/core';
import { DetailClasses } from '@bootcamp-homepage/models/detail-classes';
import { DetailClassService } from '@bootcamp-homepage/services/detail-class.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  listTopClasses : DetailClasses[] = [];
  top: any[] = [1,2,3];
  isLoading: boolean = true;

  constructor(
    private dtlClassService: DetailClassService,
  ) { }

  ngOnInit(): void {
    this.dtlClassService.getPopularClass().subscribe(res => {
      this.listTopClasses = res.data;
      this.isLoading = false;
    })
  }

}
