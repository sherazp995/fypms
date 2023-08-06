import { Component, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { AppService } from '../../services/app.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css'],
})
export class ShowProjectComponent {
  project: any = {};
  groups: any[] = [];
  documents: any[] = [];
  documentForm: FormGroup;
  selectedFile: any = {};
  myModal: any = null;
  @ViewChild(CreateTaskComponent) task: CreateTaskComponent;
  constructor(
    private route: ActivatedRoute,
    private apiServices: ApiService,
    private appServices: AppService,
    private renderer: Renderer2,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.apiServices.project(this.get_id()).subscribe((res) => {
      this.project = res.result;
      this.groups = res.groups;
    });
    apiServices
      .find_documents({ reference: this.get_id(), type: 'project' })
      .subscribe((res) => {
        this.documents = res.result;
      });
      this.initForm();
  }

  initForm() {
    this.documentForm = this.formBuilder.group({
      document: ['', Validators.required],
    });
  }

  downloadProject() {
    let projectLink: any = this.appServices.getProjectFile(
      this.project.project_file
    );
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', projectLink);
    link.setAttribute('download', this.project.project_file);
    link.click();
    link.remove();
  }

  addTask() {
    this.task.addTask({
      project: this.project._id,
      supervisor: this.appServices.getUser()._id,
    });
  }

  addDocument(content) {
		this.myModal = this.modalService.open(content, { centered: true });
  }

  deleteProject() {
    this.apiServices.delete_project(this.project._id).subscribe((res) => {
      if (res.status === 200) {
        this.appServices.showFlash({ success: res.message });
        this.router.navigate(['projects']);
      }
    });
  }

  get_id() {
    return this.route.snapshot.params['id'];
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitDocument() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Prepare form data to submit
    const formData = new FormData();
    formData.append('document', this.selectedFile, this.selectedFile.name);
    formData.append('type', 'project');
    formData.append('reference', this.get_id());

    // Submit the form data to the API
    this.apiServices.upload_document(formData).subscribe((res) => {
      this.appServices.showFlash({ success: 'File Submitted Successfully' });
      this.documentForm.reset();
      this.myModal.dismiss();
      this.selectedFile = null;
    });
  }
}
