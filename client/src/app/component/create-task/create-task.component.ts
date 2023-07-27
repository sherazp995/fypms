import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  @Output() taskCreated = new EventEmitter<any>();
  document: any = null;
  taskForm: any;
  deadline: string;
  myModal: any;
  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private apiServices: ApiService
  ) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      startDate: [new Date().toISOString().split('T')[0], Validators.required],
      deadline: ['', Validators.required],
      supervisor: ['', Validators.required],
      project: ['', Validators.required],
      group: [''],
      totalMarks: [''],
      questionDocument: [''],
    });
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    this.deadline = (year + '-' + month + '-' + day);
  }

  onFileSelected(event: any) {
    this.document = event.target.files[0];
  }

  showForm(content) {
    this.myModal = this.modalService.open(content, { centered: true });
  }

  addTask(formValues: any) {
    this.taskForm.patchValue(formValues);
    this.showForm(this.content);
  }

  createTask() {
    let formData = this.taskForm.value;
    formData.deadline = this.deadline;
    if(this.document) {
      let fileData = new FormData();
      fileData.append('document', this.document, this.document.name);
      fileData.append('type', 'task')
      this.apiServices.upload_document(fileData).subscribe((response) => {
        formData.questionDocument = response.result._id;
        this.submitTask(formData);
      });
    } else {
      this.submitTask(formData);
    }
  }

  submitTask(task: any) {
    this.apiServices.create_task(task).subscribe((response) => {
      this.taskCreated.emit(response.result);
      this.myModal.dismiss()
    });
  }
}
