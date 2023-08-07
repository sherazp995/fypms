import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css']
})
export class ShowGroupComponent {
  group: any = {};
  project: any = {};
  students: any[] = [];
  tasks: any[] = [];
  taskData: any;
  currentUser: any = {};
  @ViewChild(CreateTaskComponent) task: CreateTaskComponent;

  constructor(private route: ActivatedRoute, private apiServices: ApiService, private appServices: AppService, private router: Router){
    this.currentUser = appServices.getUser();
    if (this.currentUser.role !== 'student') {
      this.get_group(this.get_id());
    } else {
      this.get_group(this.currentUser.group);
    }
  }

  get_group(id) {
    this.apiServices.group(id).subscribe((res) => {
      this.group = res.result;
      this.project = this.group.project;
      this.students = res.students;
      this.tasks = res.tasks;
    })
  }

  addTask() {
    this.taskData = {project: this.project._id, group: this.group._id, supervisor: this.appServices.getUser()._id}
    this.task.addTask(this.taskData)
  }
  
  addToTasks(task) {
    this.tasks.push(task)
  }

  get_id(){
    return this.route.snapshot.params['id']
  }
}


