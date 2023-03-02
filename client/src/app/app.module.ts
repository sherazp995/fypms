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
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgTiltModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
