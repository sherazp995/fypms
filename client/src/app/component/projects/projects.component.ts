import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = []
  user: any = {}

  constructor(private apiServices: ApiService, private appServices: AppService) {
    this.user = appServices.get_user()
    if (this.user['role'] == "supervisor") {
      this.apiServices.project_by_supervisor(this.user['_id']).subscribe((res) => {
        this.projects = res.result
      })
    } else {
      this.apiServices.all_projects().subscribe((res) => {
        this.projects = res.result
      })
    }
  }

  selectProject(project_id: string) {
    this.apiServices.select_project({ project_id: project_id, user_id: this.user._id }).subscribe(res => {
      this.appServices.set_user(res.user);
    })
  }
}
