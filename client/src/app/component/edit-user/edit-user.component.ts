import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AppService} from "../../services/app.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: any = {};
  userForm: any;
  selectedImage: File = null;
  userID: any = null;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService){
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
      password: [''],
      confirmPassword: [''],
      skypeId: ['']
    });
    
  }

  ngOnInit(){
    this.userID = this.get_id();
    if (this.userID) {
      this.apiServices.user(this.userID).subscribe((res) => {
        this.user = res.result;
        delete this.user.password;
        this.userForm.patchValue(this.user);
      });
    } else {
      this.user = this.appServices.getUser();
      delete this.user.password;
      this.userForm.patchValue(this.user);
    }
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  get_id(){
    return this.route.snapshot.params['id'];
  }

  async update(){
    try {
      let formData: any = {user: this.userForm.value};
      if (this.selectedImage){
        let image = await this.appServices.getBase64(this.selectedImage);
        formData["image"] = image;
      }
      this.apiServices.update_user(formData, this.user._id).subscribe((res) => {
        this.appServices.showFlash({success: res.message});
        if (this.userID) {
          this.router.navigate(['/users/', this.userID]);
        } else {
          this.appServices.updateUser(res.result);
          this.router.navigate(['/profile']);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
