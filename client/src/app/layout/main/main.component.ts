import {Component, ViewChild} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild(SidebarComponent) child:SidebarComponent;

  toggleSidebar () {
    this.child.toggler()
  }
}
