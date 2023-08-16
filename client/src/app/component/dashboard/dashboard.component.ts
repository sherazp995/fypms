import { Component } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cardsData: any[] = [];
  projects: any[] = [];

  constructor(
    private apiServices: ApiService
  ) {
    this.getCardsData();
  }

  getCardsData(){
    this.apiServices.getDashboardData().subscribe((res: any) => {
        this.cardsData.push({ title: 'Total Users', value: res.totalUsers });
        this.cardsData.push({ title: 'Total Projects', value: res.totalProjects });
        this.cardsData.push({ title: 'My Projects', value: res.projectsUploadedByAdmin });
        this.cardsData.push({ title: 'Total Tasks Completed', value: res.totalTasksCompleted });
        this.projects = res.projects;
    });
  }

  getTimeInHours(time) {
      const currentTime: any = new Date();
      const createdAt: any = new Date(time);
      const timeDifference = currentTime - createdAt;
      return Math.floor(timeDifference / (1000 * 60 * 60));
  }
}
