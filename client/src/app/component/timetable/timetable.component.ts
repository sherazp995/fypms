import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  timetableForm: FormGroup;
  timetableEvents: any[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.timetableForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTimetableEvents();
  }

  getTimetableEvents(): void {
    this.apiService.timetable().subscribe(
      (res: any) => {
        this.timetableEvents = res.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.timetableForm.invalid) {
      return;
    }

    this.apiService.create_timetable_event(this.timetableForm.value).subscribe(
      (event: any) => {
        this.timetableEvents.push(event.result);
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clearForm(): void {
    this.timetableForm.reset();
  }

  deleteEvent(eventId: string): void {
    this.apiService.delete_timetable_event(eventId).subscribe(
      () => {
        this.timetableEvents = this.timetableEvents.filter((event) => event._id !== eventId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
