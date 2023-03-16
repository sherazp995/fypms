import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor() {  }

  register_object = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    role: ''
  }

  users = ['Student', 'Supervisor']
  
  validate_email() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.register_object.email)){
      return true;
    }
    else{
      return false;
    }
  }

  sign_up() {
    console.log(this.register_object)
  }
}
