import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

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

  validate_email() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.login_object.username)){
      return true;
    }
    else{
      return false;
    }
  }

  login() {
    if (this.login_object.username.trim() !== '' && this.login_object.password.trim() !== '') {
      console.log(this.login_object)
      this.login_object.username = this.login_object.username.trim();
      this.login_object.password = this.login_object.password.trim();

      this.apiServices.login(this.login_object).subscribe(res => {
        if(res.message == "Authorized"){
          localStorage.setItem('data', JSON.stringify(res.result));
          console.log(res.jwtToken)
          localStorage.setItem('jwt', res.jwtToken)
          this.router.navigate(["/"])
        }
        else{
          console.log(res.message)
        }
      })

    }
  }
}
 