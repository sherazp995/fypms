import {Component, ViewChild} from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'app/services/api.service'

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

  constructor(private apiServices: ApiService, private router: Router) {  }

  upload_project = {
    title: '',
    description: '',
    skills: '',
    domain: '',
    languages: '',
    tools: ''
  }
  // for file uploading
  // upload_project = {
  //   title: '',
  //   description: '',
  //   skills: '',
  //   domain: '',
  //   languages: '',
  //   tools: '',
  //   project_file: ''
  // }

  upload() {
    this.apiServices.upload_project(this.upload_project).subscribe((res) => {
      this.router.navigate(['/projects'])
    })
  }
}
