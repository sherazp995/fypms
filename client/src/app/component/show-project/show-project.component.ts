import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent {
  project = {}
  constructor(private route: ActivatedRoute, private apiServices: ApiService){
    this.apiServices.project_by_id(this.get_id()).subscribe((res) => {
      console.log(res)
      this.project = res.result
      console.log(this.project)
    })
    }
  
  get_id(){
    return this.route.snapshot.params['id']
  }
}
