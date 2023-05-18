import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  groupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiServices: ApiService, private appServices: AppService) {
  }
  
  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      domain: ['', Validators.required],
      maxStudents: [1, Validators.required],
      project_file: ['', Validators.required],
    });
  }
}
