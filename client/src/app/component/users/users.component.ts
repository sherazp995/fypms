import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[];
  myUser: any;
  // admins: any[];
  // supervisors: any[];
  // students: any[];

  constructor(private apiServices: ApiService, private appServices: AppService) {
    this.myUser = this.appServices.getUser();
    this.apiServices.all_users().subscribe((res) => {
      this.users = res.result
      // this.admins = this.users.filter((user) => user.role === 'admin')
      // this.supervisors = this.users.filter((user) => user.role === 'supervisor')
      // this.students = this.users.filter((user) => user.role === 'student')
    })
  }
}
