import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any[]

  constructor(private apiServices: ApiService) {
    let user = JSON.parse(localStorage.getItem('data'))
    if (user.role = "Supervisor") {
      this.apiServices.project_by_supervisor(user._id).subscribe((res) => {
        this.projects = res.result
      })
    } else {
      this.apiServices.all_projects().subscribe((res) => {
        this.projects = res.result
      })
    }
  }
}
