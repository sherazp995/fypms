import {Component, ViewChild} from '@angular/core'

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

  constructor() {  }

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
    console.log(this.upload_project)
  }
}
