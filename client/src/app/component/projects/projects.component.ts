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
    appServices.connect_socket();
  }

  ngOnInit() {
    this.user = this.appServices.get_user()
    if (this.router.url === '/my_projects') {
      this.apiServices.project_by_supervisor(this.user['_id']).subscribe((res) => {
        this.projects = res.result
      })
    } else {
      this.apiServices.all_projects().subscribe((res) => {
        this.projects = res.result
      })
    }
    this.appServices.socket.on('projectSelected', (data: any) => {
      this.updateProjectCount(data.project);
      this.appServices.set_user(data.user);
      this.user = this.appServices.get_user()
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

  ngOnDestroy() {
    this.appServices.disconnect_socket()
  }  
}
