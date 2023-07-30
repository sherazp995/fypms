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
    this.currentUser = appServices.getUser()
    this.profilePic = appServices.getProfilePic(this.currentUser.image);
  }

  ngOnInit(): void {
    this.loadLatestMessages();
  }

  loadLatestMessages() {
    this.apiServices.getAllMessages().subscribe(
      (data) => {
        this.usersWithMessages = data.result;
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
}
