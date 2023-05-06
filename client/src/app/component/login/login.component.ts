import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiServices: ApiService, private router: Router) {  }

  login_object = {
    username: '',
    password: '',
    remember_me: false
  }

  login() {
    if (this.login_object.username.trim() !== '' && this.login_object.password.trim() !== '') {
      this.login_object.username = this.login_object.username.trim();
      this.login_object.password = this.login_object.password.trim();

      this.apiServices.login(this.login_object).subscribe((res) => {
        console.log(res.message)
        if (res.message == "Authorized") {
          localStorage.setItem('data', JSON.stringify(res.result));
          localStorage.setItem('jwt', res.jwtToken)
          this.router.navigate(['/'])
        } else {
          console.log(res.message)
        }
      })

    }
  }
}
