import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: any = {};
  selectedImage: File | null = null;
  userID: any = null;

  constructor(private router: Router, private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService){
    this.userID = this.get_id();
    if (this.userID) {
      this.apiServices.user(this.userID).subscribe((res) => {
        this.user = res.result
      })
    } else {
      this.user = this.appServices.get_user()
    }
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  get_id(){
    return this.route.snapshot.params['id']
  }

  async update(){
    try {
      let image = await this.appServices.getBase64(this.selectedImage)
      this.apiServices.register({user: this.user, image: image}).subscribe((res) => {
        if (this.userID) {
          this.router.navigate(['/users/', this.userID]);
        } else {
          this.router.navigate(['/profile']);
        }
      });
    } catch (error) {
      console.log(error.message)
    }
  }
}
