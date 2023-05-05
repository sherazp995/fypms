import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toggled = true
  user = {}
  constructor(public route: ActivatedRoute, private appServices: AppService) { 
    this.user = appServices.get_user();
   }
  toggler () {
    this.toggled = !this.toggled
  }
}
