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
  userID: any = null;
  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService){
    this.userID = this.get_id();
    if (this.userID) {
      this.apiServices.user(this.userID).subscribe((res) => {
        this.user = res.result
        this.imageURL = appServices.getProfilePic(this.user.image)
      })
    } else {
      this.user = this.appServices.getUser()
      this.imageURL = appServices.getProfilePic(this.user.image)
    }
  }

  get_id(){
    return this.route.snapshot.params['id']
  }
}
