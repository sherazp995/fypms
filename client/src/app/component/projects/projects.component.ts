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
  user = {}

  constructor(private apiServices: ApiService, private appServices: AppService) {
    this.user = appServices.get_user()
    if (this.user['role'] == "supervisor") {
      this.apiServices.project_by_supervisor(this.user['_id']).subscribe((res) => {
        this.projects = res.result
      })
    } else {
      this.apiServices.all_projects().subscribe((res) => {
        this.projects = res.result
        console.log(res)
        // to show flash messages key is the flash type and value is flash message.
        // appServices.showFlash({ warning: "welcome to my projects" });
      })
    }
  }
}
