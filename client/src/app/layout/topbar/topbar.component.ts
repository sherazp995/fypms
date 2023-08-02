import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Output() togglerEvent = new EventEmitter();
  usersWithMessages: any[] = [];
  currentUser: any;
  profilePic: any;
  constructor(private apiServices: ApiService, private router:Router, private appServices: AppService) {
    appServices.connectSocket();
    this.currentUser = appServices.getUser()
    this.profilePic = appServices.getProfilePic(this.currentUser.image);
  }

  ngOnInit(): void {
    this.loadLatestMessages();
    this.appServices.socket.on('messageSent', (data: any) => {
      if ([data.receiver, data.sender].includes(this.currentUser._id)) {
        var foundIndex = this.usersWithMessages.findIndex(x => [data.receiver, data.sender].includes(x._id));
        let user = this.usersWithMessages[foundIndex];
        user.messages = [data.message];
        this.usersWithMessages[foundIndex] = user;
      }
    });
  }

  loadLatestMessages() {
    this.apiServices.getAllMessages().subscribe(
      (data) => {
        this.usersWithMessages = data.result.filter(x => x._id !== this.currentUser._id);
      },
      (error) => {
        console.log('Error fetching messages:', error);
      }
    );
  }

  toggleClick() {
    this.togglerEvent.emit()
  }

  signOut(){
    this.appServices.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.appServices.disconnectSocket()
  }
}
