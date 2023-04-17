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

  registerObject = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  }

  users = ['Student', 'Supervisor']

  checkName() {
    const re = /^[A-Za-z]+$/;
    if(re.test(this.registerObject.firstName) && re.test(this.registerObject.lastName)){
      return true;
    }
    else{
      console.log("not valid")
      return false;
    }
  }

  validateEmail() {
    const re = /^[a-zA-Z]\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(re.test(this.registerObject.email)){
      return true;
    }
    else{
      console.log("not valid")
      return false;
    }
  }

  validatePassword() {
    // const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(re.test(this.register_object.email)){
    //   return true;
    // }
    // else{
    //   console.log("not valid")
    //   return false;
    // }
    return true
  }

  signUp() {
    if (this.validateEmail() && this.validatePassword()) {
      this.apiServices.register(this.registerObject).subscribe((res) => {
        this.router.navigate(['/login'])
      })
    } else {
      console.log("invalid email or password")
    }
  }
}
