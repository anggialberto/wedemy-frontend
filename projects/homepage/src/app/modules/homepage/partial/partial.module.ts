import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@bootcamp-homepage/shared/partials/homepage/footer/footer.component';
import { SidebarComponent } from '@bootcamp-homepage/shared/partials/homepage/sidebar/sidebar.component';
import { HeaderComponent } from '@bootcamp-homepage/shared/partials/homepage/header/header.component';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, SidebarComponent, FooterComponent
  ]
})
export class PartialModule { }
