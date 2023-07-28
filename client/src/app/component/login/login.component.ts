import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiServices: ApiService, private router: Router, private appServices: AppService) {  }

  login_object = {
    username: '',
    password: '',
    remember_me: false
  }

  login(event) {
    this.appServices.disableClick(event);
    if (this.login_object.username.trim() !== '' && this.login_object.password.trim() !== '') {
      this.login_object.username = this.login_object.username.trim();
      this.login_object.password = this.login_object.password.trim();

      this.apiServices.login(this.login_object).subscribe((res) => {
        if (res.status == 200) {
          this.appServices.login(res)
          this.router.navigate(['/'])
        } else {
          this.appServices.showFlash({danger: res.message})
        }
      })

    }
  }
}
