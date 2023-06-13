import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css']
})
export class ShowGroupComponent {
  group: any = {};
  project: any = {};
  students: any[] = [];
  panels = [
    { title: 'Panel 1', content: 'Content for panel 1', id: 'panel1' },
    { title: 'Panel 2', content: 'Content for panel 2', id: 'panel2' },
    { title: 'Panel 3', content: 'Content for panel 3', id: 'panel3' }
  ];
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService, private router: Router){
    this.apiServices.group(this.get_id()).subscribe((res) => {
      this.group = res.result;
      this.project = this.group.project;
      this.students = res.students;
    })
  }

  get_id(){
    return this.route.snapshot.params['id']
  }
}


