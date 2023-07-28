import {Component} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toggled = true;
  active: string;
  user: any = {};
  constructor(private appServices: AppService, private router: Router) { 
    this.user = this.appServices.getUser();
    this.active = this.router.url;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.active = event.url;
        console.log(this.active);
      }
    });
   }
  toggler () {
    this.toggled = !this.toggled
  }
}
