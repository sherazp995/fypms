import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  groupForm!: FormGroup;
  projectList: any[] = []; 
  studentList: any[]; 
  selectedProject!: any;
  searchControl = new FormControl('', Validators.required);
  filteredProjects: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private apiServices: ApiService) { 
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
      name: ['', Validators.required],
      users: [[], Validators.required],
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
      console.log(this.studentList);
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

  createGroup() {
    if (this.groupForm.invalid) {
      return;
    }
    // Get form values
    // this.groupForm.value.project = this.selectedProject;
    // const formValues = this.groupForm.value;
   
    // console.log(formValues)
  }
}
