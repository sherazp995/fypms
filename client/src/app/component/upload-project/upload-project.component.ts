import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

  upload_project = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    role: ''
  }

}
