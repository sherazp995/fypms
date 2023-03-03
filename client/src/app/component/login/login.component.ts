import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(){
    this.validate_fields()
  }

  login_object = {
    username: '',
    password: '',
    remember_me: false
  }

  validate_fields() {
    for (const key in this.login_object) {
     console.log()
    }
  }

  submit() {
    console.log(this.login_object)
  }
}
 