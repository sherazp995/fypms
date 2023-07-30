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
  }

  loadLatestMessages() {
    this.apiService.getAllMessages().subscribe(
      (data) => {
        this.usersWithMessages = data.result;
        this.isLoading = false;
      },
      (error) => {
        console.log('Error fetching messages:', error);
        this.isLoading = false;
      }
    );
  }
}
