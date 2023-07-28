import { Component,Renderer2, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import {AppService} from "../../services/app.service";
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent {
  project: any = {};
  groups: any[];
  @ViewChild(CreateTaskComponent) task: CreateTaskComponent;
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService, private renderer: Renderer2, private router: Router){
    this.apiServices.project(this.get_id()).subscribe((res) => {
      this.project = res.result
      this.groups = res.groups
    })
  }

  downloadProject(){
    let projectLink: any = this.appServices.getProjectFile(this.project.project_file)
    const link =  this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', projectLink);
    link.setAttribute('download', this.project.project_file);
    link.click();
    link.remove();
  }
  
  addTask() {
    this.task.addTask({project: this.project._id, supervisor: this.appServices.getUser()._id})
  }

  deleteProject(){
    this.apiServices.delete_project(this.project._id).subscribe((res) => {
      if (res.status === 200) {
        this.appServices.showFlash({success: res.message})
        this.router.navigate(['projects'])
      }
    })
  }

  get_id(){
    return this.route.snapshot.params['id']
  }
}
