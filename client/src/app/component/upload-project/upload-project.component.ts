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

  normalize_values() {
    let data = this.upload_project
    for (let key in data) {
      if (typeof data[key] === "object") {
        data[key] = data[key].map(val => val.value)
      }
    }
    return {
      title: 'a',
      description: 'aa',
      skills: 'a',
      domain: 'a',
      languages: 'a',
      tools: 'a'
    }
  }

  upload() {
    let data = this.normalize_values()
    console.log(data)
    let user = JSON.parse(localStorage.getItem('data'))
    if (user.role == "Supervisor") {
      this.apiServices.upload_project({user: user, project: data}).subscribe((res) => {
        console.log(res)
        this.router.navigate(['/projects'])
      })
    }
  }
}
