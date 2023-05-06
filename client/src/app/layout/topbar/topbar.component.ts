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
  user: any
  constructor(private apiServices: ApiService, private router:Router, private appServices: AppService) {
    this.user = appServices.get_user()
  }

  toggleClick() {
    this.togglerEvent.emit()
  }

  logout() {
    localStorage.removeItem('data')
    localStorage.removeItem('jwt')
    location.reload();
  }
}
