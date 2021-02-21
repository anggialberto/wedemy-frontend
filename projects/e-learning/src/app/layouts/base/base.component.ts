import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { AuthService } from '@bootcamp-homepage/services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  title: string = 'Dashboard'

  constructor(private router: Router,
    private authService: AuthService,
    private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): void {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('/auth/login');
    }
  }

}
