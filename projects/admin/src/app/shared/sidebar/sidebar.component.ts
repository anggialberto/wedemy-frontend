import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@bootcamp-admin/service/auth.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  isSuperAdmin: boolean;
  panelOpenState = false;
  public isOpenUiElements = false;

  constructor(private auth: AuthService, private route: Router) {

  }

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }

  ngOnInit(): void {
    if (this.auth.getRole() == 'ADM') {
      this.isSuperAdmin = false;
    } else {
      this.isSuperAdmin = true;

    }
  }

  clickUserPage(role: string) {
    this.panelOpenState = true;
    this.route.navigateByUrl(`/admin/user/${role}`)
  }

}
