import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { PasswordComponent } from './component/password/password.component';
import { RegisterComponent } from './component/register/register.component';
import { UploadProjectComponent } from './component/upload-project/upload-project.component';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import { ProjectsComponent } from "./component/projects/projects.component";
import { LoginGuard } from './guards/login.guard';
import { ComponentGuard } from './guards/component.guard';
import { ShowProjectComponent } from "./component/show-project/show-project.component";
import { SupervisorGuard } from './guards/supervisor.guard';
import { UsersComponent } from "./component/users/users.component";
import { AdminGuard } from "./guards/admin.guard";
import { ShowUserComponent } from "./component/show-user/show-user.component";
import { EditUserComponent } from "./component/edit-user/edit-user.component";
import { GroupsComponent } from './component/groups/groups.component';
import { ShowGroupComponent } from './component/show-group/show-group.component';

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
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'users/:id',
        component: ShowUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'users/:id/edit',
        component: EditUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'profile',
        component: ShowUserComponent
      },
      {
        path: 'profile/edit',
        component: EditUserComponent
      },
      {
        path: 'projects/new',
        component: UploadProjectComponent,
        canActivate: [SupervisorGuard]
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'projects/:id',
        component: ShowProjectComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'groups/:id',
        component: ShowGroupComponent
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    canActivateChild: [LoginGuard],
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
