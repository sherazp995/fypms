import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  groups: any[] = [];
  user: any = {};

  constructor(private apiServices: ApiService, private appServices: AppService, private router: Router) {
    this.user = this.appServices.getUser();
    if (this.user['role'] == "admin" && router.url == '/groups') {
      this.apiServices.all_groups().subscribe((res) => {
        this.groups = res.result
      })
    } else {
      this.apiServices.project_by_supervisor(this.user['_id']).subscribe((res) => {
        this.apiServices.find_groups({project: {$in: res.result.map((r) => r._id)}}).subscribe((response) => {
          this.groups = response.result
        })
      })
    }
  }
}
