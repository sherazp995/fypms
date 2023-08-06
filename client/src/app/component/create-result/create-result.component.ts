import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.css']
})
export class CreateResultComponent {
  @Output() resultCreated = new EventEmitter<any>();
  resultId: string = '';
  document: any = null;
  resultForm: any;
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
    this.resultForm = this.formBuilder.group({
      score: ['', Validators.required],
      remarks: [''],
      supervisor: ['', Validators.required],
      task: ['', Validators.required],
      group: ['', Validators.required],
      markedDocument: [null],
    });
  }

  onFileSelected(event: any) {
    this.document = event.target.files[0];
  }

  showForm(content) {
    this.myModal = this.modalService.open(content, { centered: true });
  }

  addResult(formValues: any) {
    formValues._id && (this.resultId = formValues._id);
    this.resultForm.patchValue(formValues);
    this.showForm(this.content);
  }

  createResult() {
    let formData = this.resultForm.value;
    if(this.document) {
      let fileData = new FormData();
      fileData.append('document', this.document, this.document.name);
      fileData.append('type', 'result')
      this.apiServices.upload_document(fileData).subscribe((response) => {
        formData.questionDocument = response.result._id;
        this.submitResult(formData);
      });
    } else {
      this.submitResult(formData);
    }
  }

  submitResult(task: any) {
    if (this.resultId) {
      this.apiServices.upate_task_result(this.resultId, task).subscribe((response) => {
        this.resultCreated.emit(response.result);
        this.myModal.dismiss()
      });
    } else {
      this.apiServices.create_task_result(task).subscribe((response) => {
        this.resultCreated.emit(response.result);
        this.myModal.dismiss()
      });
    }
  }
}
