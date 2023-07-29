import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css']
})
export class AllMessagesComponent {
  usersWithMessages: any[] = [];
  usersWithoutMessages: any[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadLatestMessages();
    this.fetchUsersWithoutMessages();
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

  fetchUsersWithoutMessages(): void {
    this.apiService.usersWithoutMessages().subscribe(
      (data) => {
        console.log(data)
        this.usersWithoutMessages = data.result;
      },
      (error) => {
        console.error('Error fetching users without messages:', error);
      }
    );
  }
}
