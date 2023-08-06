import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';
import { CreateResultComponent } from '../create-result/create-result.component';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css'],
})
export class ShowTaskComponent {
  taskId: string;
  task: any = {}; // Replace 'any' with the actual type of your task object
  taskResult: any = {}; // Replace 'any' with the actual type of your task result object
  selectedFile: File | null = null;
  documents: any[] = [];
  groupForm: FormGroup;
  newResult: any = {};
  @ViewChild(CreateResultComponent) result: CreateResultComponent;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private appServices: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
      this.fetchTaskDetails();
      this.fetchTaskResultDetails();
      this.fetchDocuments();
      this.initForm();
    });
  }

  initForm() {
    this.groupForm = this.formBuilder.group({
      document: ['', Validators.required],
    });
  }

  fetchTaskDetails(): void {
    this.apiService.task(this.taskId).subscribe((res) => {
      this.task = res.result;
      this.newResult = {
        task: this.taskId,
        supervisor: this.task.supervisor,
        group: this.task.group,
      };
    });
  }

  fetchTaskResultDetails(): void {
    this.apiService
      .find_task_results({ task: this.taskId })
      .subscribe((res) => {
        if (!!res.result[0]) {
          this.taskResult = res.result[0];
          this.newResult = this.taskResult;
        }
      });
  }

  fetchDocuments(): void {
    this.apiService
      .find_documents({ reference: this.taskId, type: 'task' })
      .subscribe((res) => {
        if (!!res.result[0]) {
          this.documents = res.result;
        }
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  makeResult() {
    this.result.addResult(this.newResult)
  }

  addResult(result: any) {
    this.taskResult = result; 
  }

  submitTask() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Prepare form data to submit
    const formData = new FormData();
    formData.append('document', this.selectedFile, this.selectedFile.name);
    formData.append('type', 'task');
    formData.append('reference', this.taskId);
    formData.append('user', this.appServices.getUser()._id);

    // Submit the form data to the API
    this.apiService.upload_document(formData).subscribe((res) => {
      this.appServices.showFlash({ success: 'File Submitted Successfully' });
      this.groupForm.reset();
      this.selectedFile = null;
    });
  }
}
