import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  groups: any[] = []
  user = {}

  constructor(private apiServices: ApiService, private appServices: AppService) {
    this.user = appServices.get_user()
    // if (this.user['role'] == "supervisor") {
      this.apiServices.all_groups().subscribe((res) => {
        this.groups = res.result
      })
    // }
  }
}
