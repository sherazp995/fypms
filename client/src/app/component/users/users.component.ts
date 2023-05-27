import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = []

  constructor(private apiServices: ApiService) {
    this.apiServices.all_users().subscribe((res) => {
      this.users = res.result
    })
  }
}
