import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent {
  user: any = {};
  imageURL: any = '';
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService){
    let id = this.get_id();
    if (id) {
      this.apiServices.user(id).subscribe((res) => {
        this.user = res.result
        this.imageURL = appServices.getProfilePic(this.user.image)
      })
    } else {
      this.user = this.appServices.get_user()
      this.imageURL = appServices.getProfilePic(this.user.image)
    }
  }

  get_id(){
    return this.route.snapshot.params['id']
  }
}
