import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any = [];
  user: any = {};

  constructor(private router: Router, private apiServices: ApiService, private appServices: AppService) {
  }

  ngOnInit() {
    this.user = this.appServices.getUser();
    if (this.router.url === '/my_projects') {
      this.apiServices.project_by_supervisor(this.user['_id']).subscribe((res) => {
        this.projects = res.result;
      });
    } else {
      this.apiServices.all_projects().subscribe((res) => {
        this.projects = res.result;
      });
    }
    this.appServices.socket.on('projectSelected', (data: any) => {
      this.updateProjectCount(data.project);
      this.user = this.appServices.updateUser(data.user)
    });
  }

  updateProjectCount(project) {
    var foundIndex = this.projects.findIndex(x => x._id == project._id);
    this.projects[foundIndex] = project;
  }

  selectProject(project_id: string, event) {
    this.appServices.disableClick(event);
    this.apiServices.select_project({ project_id: project_id, user_id: this.user._id }).subscribe(res => {
    })
  }

  rejectProject(project_id: string, event) {
    this.appServices.disableClick(event);
    this.apiServices.reject_project({ project_id: project_id, user_id: this.user._id }).subscribe(res => {
    })
  }
}
