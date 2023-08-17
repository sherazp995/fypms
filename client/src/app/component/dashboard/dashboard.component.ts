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
  upcomingMeetings: any[] = [];
  constructor(
    private apiServices: ApiService
  ) {
    this.getCardsData();
  }

  getCardsData(){
    this.apiServices.getDashboardData().subscribe((res: any) => {
        this.cardsData.push({ title: 'Total Users', value: res.totalUsers, bg: 'success', link: '/users' });
        this.cardsData.push({ title: 'Total Projects', value: res.totalProjects, bg: 'info', link: '/projects' });
        this.cardsData.push({ title: 'My Projects', value: res.projectsUploadedByAdmin, bg: 'warning', link: '/my_projects' });
        this.cardsData.push({ title: 'Total Tasks Completed', value: res.totalTasksCompleted, bg: 'primary', link: '' });
        this.projects = res.projects;
        this.upcomingMeetings = res.upcomingMeetings;
    });
  }

  getTimeInHours(time) {
      const currentTime: any = new Date();
      const createdAt: any = new Date(time);
      const timeDifference = currentTime - createdAt;
      return Math.floor(timeDifference / (1000 * 60 * 60));
  }

  getTime(date) {
    const hours = (new Date(date)).getHours(); // Get the hours (0-23)
    const minutes = (new Date(date)).getMinutes();
    return `${hours}:${minutes}`;
  }

  getDate(date) {
    return (new Date(date)).getDate();
  }

  getMonth(date) {
    const monthIndex = (new Date(date)).getMonth();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[monthIndex]; 
  }
}
