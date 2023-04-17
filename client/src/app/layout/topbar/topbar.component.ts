import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Output() togglerEvent = new EventEmitter();

  constructor(private apiServices: ApiService, private router:Router) {  }

  toggleClick() {
    this.togglerEvent.emit()
  }

  logout() {
    localStorage.removeItem('data')
    localStorage.removeItem('jwt')
    location.reload();
  }
}
