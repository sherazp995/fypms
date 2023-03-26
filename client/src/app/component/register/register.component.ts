import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private apiServices: ApiService, private router: Router) {  }

  register_object = {
    email: 'usamatahreem920@gmail.com',
    first_name: 'Usama',
    last_name: 'Khalid',
    password: '12345',
    password_confirm: '12345',
    role: 'Student'
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
    this.apiServices.register(this.register_object).subscribe((res) => {
      this.router.navigate(['/login'])
    })
  }
}
