import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css'],
})
export class AllMessagesComponent {
  usersWithMessages: any[] = [];
  isLoading: boolean = true;
  currentUser: any = this.appService.getUser();
  selectedUser: string = '';

  constructor(
    private apiService: ApiService,
    private appService: AppService,
    private router: Router,
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.selectedUser = event.url.split('/')[2];
      }
    });
  }

  ngOnInit(): void {
    this.loadLatestMessages();
    this.appService.socket.on('messageSent', (data: any) => {
      if ([data.receiver, data.sender].includes(this.currentUser._id)) {
        var foundIndex = this.usersWithMessages.findIndex(x => [data.receiver, data.sender].includes(x._id));
        let user = this.usersWithMessages[foundIndex];
        user.messages = [data.message];
        this.usersWithMessages[foundIndex] = user;
      }
    });
  }

  loadLatestMessages() {
    this.apiService.getAllMessages().subscribe(
      (data) => {
        this.usersWithMessages = data.result.filter(x => x._id !== this.currentUser._id);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error fetching messages:', error);
        this.isLoading = false;
      }
    );
  }
}
