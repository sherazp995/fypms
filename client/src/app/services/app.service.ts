import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user = {}
  constructor(private apiServices: ApiService) { }

  get_user() {
    this.user = JSON.parse(localStorage.getItem('data'))
    return this.user
  }

  getBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64File = base64String.split(',')[1];
        resolve(base64File);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  getProfilePic (image) {
    if (image) {
      return this.apiServices.imgURL + "userImages/" + image
    } else {
      return false
    }
  }
}
