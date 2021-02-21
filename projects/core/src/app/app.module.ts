import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassFilterPipe } from './shared/pipes/class-filter.pipe';
import { ModuleFilterPipe } from './shared/pipes/module-filter.pipe';
import { HeaderComponent } from './shared/partials/participant-instructor/header/header.component';
import { FooterComponent } from './shared/partials/participant-instructor/footer/footer.component';
import { SidebarComponent } from './shared/partials/participant-instructor/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassFilterPipe,
    ModuleFilterPipe,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
