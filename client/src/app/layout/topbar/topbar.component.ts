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
    console.log("logging out")
    localStorage.clear()
    this.router.navigate(['/login'])
    // let user = JSON.parse(localStorage.getItem('data'))
    // this.apiServices.logout(user).subscribe((res) => {
    //   this.router.navigate(['/login'])
    // })
  }
}
