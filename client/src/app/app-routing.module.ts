import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { PasswordComponent } from './component/password/password.component';
import { RegisterComponent } from './component/register/register.component';
import { UploadProjectComponent } from './component/upload-project/upload-project.component';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import {ProjectsComponent} from "./component/projects/projects.component";
import { LoginGuard } from './guards/login.guard';
import { ComponentGuard } from './guards/component.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [ComponentGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'upload_project',
        component: UploadProjectComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot_password',
        component: PasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
