import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';
import { Observable, OperatorFunction, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  groupForm!: FormGroup;
  projectList: any[] = []; 
  studentList: any[]; 
  selectedStudents: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private apiServices: ApiService, private appServices: AppService) { 
    apiServices.all_projects().subscribe(res => {
      if(res) {
        this.projectList = res.result;
      }
    })
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      project: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  getUsers(project: any): void{
    this.apiServices.students_by_project(project.item._id).subscribe(res => {
      this.studentList = res.result;
    })
  }

  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map((term) =>
      term === '' ? this.projectList : this.projectList.filter((v) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );
  formatter = (x: any) => x.title;

  addToGroup(user, event){
    this.appServices.disableClick(event);
    const index = this.studentList.indexOf(user);
    this.studentList.splice(index, 1);
    this.selectedStudents.push(user);
  }

  removeFromGroup(user, event){
    this.appServices.disableClick(event);
    const index = this.selectedStudents.indexOf(user);
    this.selectedStudents.splice(index, 1);
    this.studentList.push(user);
  }

  createGroup() {
    if (this.groupForm.invalid && this.selectedStudents.length < 1) {
      return;
    }
    let formData = this.groupForm.value;
    formData.project = formData.project._id
    formData.students = this.selectedStudents.map(s => s._id);
    this.apiServices.create_group(formData).subscribe((res) => {
      this.appServices.showFlash({success: res.message})
      this.router.navigate(['/groups'])
    });
  }
}
