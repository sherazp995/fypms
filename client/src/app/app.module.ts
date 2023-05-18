// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Services Imports
import { ApiService } from './services/api.service';
import { TokenInspectorService } from './services/token.inspector.service';
import { AppService } from './services/app.service';

//  Guards Imports
import { LoginGuard } from './guards/login.guard';
import { ComponentGuard } from './guards/component.guard';
import { AdminGuard } from './guards/admin.guard';

// Component Imports
import { AppComponent } from './app.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { PasswordComponent } from './component/password/password.component';
import { UploadProjectComponent } from './component/upload-project/upload-project.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ShowProjectComponent } from './component/show-project/show-project.component';
import { UsersComponent } from './component/users/users.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { ShowUserComponent } from './component/show-user/show-user.component';
import { GroupsComponent } from './component/groups/groups.component';
import { ShowGroupComponent } from './component/show-group/show-group.component';
import { CreateGroupComponent } from './component/create-group/create-group.component';

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
    ShowUserComponent,
    GroupsComponent,
    ShowGroupComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    TagInputModule,
    NgTiltModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    LoginGuard,
    ComponentGuard,
    AdminGuard,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInspectorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
