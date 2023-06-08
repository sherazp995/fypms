import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user:any = null;
  socket: any;

  constructor(private apiServices: ApiService, private flashMessage: FlashMessagesService) { }

  logout() {
    localStorage.removeItem('data');
    localStorage.removeItem('jwt');
  }

  get_user() {
    let data = localStorage.getItem('data');
    if(data !== 'undefined'){
      this.user = JSON.parse(data);
    } else {
      this.logout();
    }
    return this.user;
  }

  connect_socket(){
    this.socket = io('http://localhost:4000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
  }

  disconnect_socket(){
    this.socket.disconnect();
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
