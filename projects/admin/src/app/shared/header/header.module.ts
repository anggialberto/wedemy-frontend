import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';

import { HeaderComponent } from './containers';
import { UserComponent } from './components';
import { ShortNamePipe } from './pipes';
import { RouterModule } from '@angular/router';
import { PengaturanModule } from '../../module/master/pengaturan/pengaturan.module';

@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent,
    ShortNamePipe
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    RouterModule
  ]
})
export class HeaderModule { }
