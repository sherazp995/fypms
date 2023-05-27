import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerObject: any;
  selectedImage: File | null = null; // Variable to store the selected image file

  constructor(private apiServices: ApiService, private router: Router, private appServices: AppService) {
    this.registerObject = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      image: ''
    };
  }

  users = ['student', 'supervisor'];

  onImageSelected(event: any) {
      this.selectedImage = event.target.files[0]; // Store the selected image file
  }

  async signUp() {
  try {
    let image = await this.appServices.getBase64(this.selectedImage)
    this.apiServices.register({user: this.registerObject, image: image}).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  } catch (error) {
    console.log(error.message)
  }
  }
}
