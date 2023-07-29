import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  messages: any[] = [];
  currentPage = 1;
  isLoading = false;
  userId: string;
  newMessage: any = {};
  currentUser:any = this.appServices.getUser()

  constructor(private apiServices: ApiService, private route: ActivatedRoute, private appServices: AppService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.newMessage.receiver = this.userId;
      this.newMessage.sender = this.currentUser._id;
      this.fetchMessages();
    });
  }

  fetchMessages(): void {
    this.isLoading = true;
    this.apiServices.getMessages(this.userId, this.currentPage).subscribe(
      (data) => {
        console.log(data.result)
        this.messages = data.result.reverse().concat(this.messages);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log('Error fetching messages:', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const bodyHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollPosition + windowHeight >= bodyHeight) {
      this.currentPage++;
      this.fetchMessages();
    }
  }
  isSentByUser(message: any) {
    return (this.currentUser._id == message.sender)
  }
  sendMessage(): void {
    if (!this.newMessage.content.trim()) {
      return;
    }
    console.log(this.newMessage)
    this.apiServices.sendMessage(this.newMessage).subscribe(
      (response: any) => {
        this.newMessage.content = '';
        this.newMessage.attachment = null;
        this.messages = this.messages.concat(response.result);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.newMessage.attachment = event.target.files[0];
  }
}