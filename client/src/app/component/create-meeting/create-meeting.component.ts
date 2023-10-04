import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent {
  meetingForm!: FormGroup;
  studentList: any[] = [];
  selectedStudents: any[] = [];
  supervisor: any;
  meetingList: any[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private appServices: AppService) {
    this.supervisor = this.appServices.getUser();
    this.getUsers();
    this.allMeetings();
  }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      participants: [''],
      supervisor: [this.supervisor._id, Validators.required],
    });
  }

  getUsers(): void{
    this.apiService.find_users({supervisor: this.supervisor._id}).subscribe(res => {
      this.studentList = res.result;
    })
  }

  addToMeeting(user, event){
    this.appServices.disableClick(event);
    const index = this.studentList.indexOf(user);
    this.studentList.splice(index, 1);
    this.selectedStudents.push(user);
  }

  removeFromMeeting(user, event){
    this.appServices.disableClick(event);
    const index = this.selectedStudents.indexOf(user);
    this.selectedStudents.splice(index, 1);
    this.studentList.push(user);
  }

  createMeeting() {
    if (this.meetingForm.invalid) {
      return;
    }
    let formData = this.meetingForm.value;
    formData.participants = this.selectedStudents.map(s => s._id.toString())
    console.log(this.meetingForm.value)
    this.apiService.create_meeting(this.meetingForm.value).subscribe((res) => {
    }, (error) => {
      console.error('Error creating meeting:', error);
    });
    this.allMeetings();
  }

  allMeetings() {
    this.apiService.meetings().subscribe(
      (res: any) => {
        this.meetingList = res.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteMeeting(meetingId: string): void {
    this.apiService.delete_meeting(meetingId).subscribe(
      () => {
        this.meetingList = this.meetingList.filter((event) => event._id !== meetingId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
