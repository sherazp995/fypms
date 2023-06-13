import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  groupForm!: FormGroup;
  focused: boolean = false;
  projectList: any[] = []; 
  studentList: any[]; 
  selectedProject!: any;
  selectedStudents: any[] = [];
  searchControl = new FormControl('', Validators.required);
  filteredProjects: Observable<any[]>;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiServices: ApiService, private appServices: AppService) { 
    apiServices.all_projects().subscribe(res => {
      if(res) {
        this.projectList = res.result;
      }
    })
    this.filteredProjects = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adjust debounce time as needed
      distinctUntilChanged(),
      map(value => {
        return this.filterProjects(value!)
      })
    );
  }


  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      project: this.searchControl,
      name: ['', Validators.required]
    });
  }

  filterProjects(value: string): any[] {
    const filterValue = value.toLowerCase();
    let project1 = this.groupForm.get('project');
    project1.setValue(value);
    return this.projectList.filter(project => project.title.toLowerCase().includes(filterValue) && ![project1.value].includes(project.title));
  }

  getUsers(): void{
    this.apiServices.students_by_project(this.selectedProject._id).subscribe(res => {
      this.studentList = res.result;
    })
  }

  displayproject(project: any): any {
    return project ? project.title : '';
  }

  selectProject(project: any): void {
    this.selectedProject = project;
    this.searchControl.setValue(project.title);
    this.getUsers();
  }

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
    formData.project = this.selectedProject._id;
    formData.students = this.selectedStudents.map(s => s._id);
    this.apiServices.create_group(formData).subscribe((res) => {
      this.appServices.showFlash({success: res.message})
      this.router.navigate(['/groups'])
    });
  }
}
