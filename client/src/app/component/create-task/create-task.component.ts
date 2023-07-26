import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
	document: any = null;
  taskForm: any;
  @ViewChild('content', { static: true }) content: ElementRef;
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private apiServices: ApiService) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      supervisor: ['', Validators.required],
      project: ['', Validators.required],
      group: [''],
      totalMarks: [''],
      questionDocument: [''],
    });
  }

  onFileSelected(event: any) {
    this.document = event.target.files[0]; 
  }

  showForm(content) {
    this.modalService.open(content, { centered: true });
  }

  addTask(formValues: any) {
    this.taskForm.patchValue(formValues);
    this.showForm(this.content);
  }

  createTask(){
    let formData = this.taskForm.value
    if(this.document) {
      this.apiServices.upload_document(this.document).subscribe((response) => {
        formData.questionDocument = response.result._id
      });
    } else {

    }
    console.log(this.taskForm.value)
  }

  submitTask(task: any) {
    this.apiServices.create_task(task).subscribe((response) => {
      
    });
  }
}
