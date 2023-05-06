import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { PasswordComponent } from './component/password/password.component';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { FormsModule } from '@angular/forms';
import { UploadProjectComponent } from './component/upload-project/upload-project.component';
import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProjectsComponent } from './component/projects/projects.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowProjectComponent } from './component/show-project/show-project.component';
import { TokenInspectorService } from './services/token.inspector.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { LoginGuard } from './guards/login.guard';
import { ComponentGuard } from './guards/component.guard';
import { UsersComponent } from './component/users/users.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { ShowUserComponent } from './component/show-user/show-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    RegisterComponent,
    PasswordComponent,
    UploadProjectComponent,
    ProjectsComponent,
    ShowProjectComponent,
    UsersComponent,
    EditUserComponent,
    ShowUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    TagInputModule,
    NgTiltModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    LoginGuard,
    ComponentGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInspectorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
