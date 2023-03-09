import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() {  }

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
    console.log(this.login_object)
    if (this.login_object.username.trim() !== '' && this.login_object.password.trim() !== '' && this.validate_email()) {
      this.login_object.username = this.login_object.username.trim();
      this.login_object.password = this.login_object.password.trim();
    }
  }
}
 