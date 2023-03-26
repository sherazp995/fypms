import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any[]

  constructor() {
    this.projects = []
    for (let i = 0; i < 50; i++) {
      this.projects.push({title:"abc",domain:"dev"})
    }
  }
}
