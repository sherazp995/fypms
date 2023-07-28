import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user:any = null;
  socket: any;

  constructor(private apiServices: ApiService, private flashMessage: FlashMessagesService) { }

  userLoggedIn(): boolean {
    return (!!this.getUser()._id && !!this.getJwt());
  }
  
  getUser() {
    this.user = JSON.parse(localStorage.getItem('data') || '{}');
    return this.user;
  }

  updateUser(user: any) {
    this.user = user;
    localStorage.setItem('data', JSON.stringify(user));
    return this.user;
  }

  getJwt(){
    return localStorage.getItem('jwt');
  }

  updateJwt(jwt: any) {
    localStorage.setItem('jwt', jwt);
    return jwt;
  }

  login(response: any) {
    this.updateJwt(response.jwtToken)
    this.updateUser(response.result);
  }

  logout() {
    localStorage.removeItem('data');
    localStorage.removeItem('jwt');
  }

  connectSocket(){
    this.socket = io(environment.url, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
  }

  disconnectSocket(){
    this.socket.disconnect();
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

  uploadDocument(user: string, reference: string, type: string){
    this.apiServices.upload_document({user, reference, type}).subscribe((res) => {
      this.showFlash({success: "Document Uploaded Successfully"});
      return res.result;
    });
  }

  disableClick(event) {
    const button = (event.srcElement.disabled === undefined) ? event.srcElement.parentElement : event.srcElement;
    button.setAttribute('disabled', true);
    setTimeout(function () {
    button.removeAttribute('disabled');
    }, 1000);
  }
}
