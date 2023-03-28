import {Component, ViewChild} from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'app/services/api.service'
import { AppService } from 'app/services/app.service'

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

  constructor(private apiServices: ApiService, private router: Router, private appServices: AppService) {  }

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
    let user = this.appServices.get_user()
    if (user.role == "Supervisor") {
      this.apiServices.upload_project({user: user, project: data}).subscribe((res) => {
        console.log(res)
        this.router.navigate(['/projects'])
      })
    }
  }
}
