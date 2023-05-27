import { Component,Renderer2  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent {
  project: any = {};
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService, private renderer: Renderer2){
    this.apiServices.project(this.get_id()).subscribe((res) => {
      this.project = res.result
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

  get_id(){
    return this.route.snapshot.params['id']
  }
}
