import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
	closeResult: string;
  taskForm: any;
  @ViewChild('content', { static: true }) content: ElementRef;
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
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
    });
  }

  showForm(content) {
    this.modalService.open(content, { centered: true });
  }

  addTask(formValues: any) {
    this.taskForm.patchValue(formValues);
    this.showForm(this.content);
  }

  createTask(){
    console.log(this.taskForm.value)
  }
}
