import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user:any = {}
  constructor(private apiServices: ApiService, private flashMessage: FlashMessagesService) { }

  get_user() {
    this.user = JSON.parse(localStorage.getItem('data'));
    return this.user;
  }

  set_user(user: any) {
    localStorage.setItem('data', JSON.stringify(user));
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

  getProjectFile(file: string) {
    if (file) {
      return this.apiServices.uploadURL + "projects/" + file;
    } else {
      return false;
    }
  }

  getProfilePic(image: string) {
    if (image) {
      return this.apiServices.uploadURL + "userImages/" + image;
    } else {
      return false;
    }
  }

  showFlash(flash) {
    for (let alert in flash) {
      this.flashMessage.show(flash[alert], { cssClass: 'alert alert-' + alert, timeout: 4000 });
    }
  }
}
