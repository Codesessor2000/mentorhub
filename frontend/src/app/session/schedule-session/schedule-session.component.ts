import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-session',
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.scss']
})
export class ScheduleSessionComponent implements OnInit {
  mentors: any[] = [];
  selectedMentorId = '';
  sessionTime = '';

  constructor(private sessionService: SessionService, private http: HttpClient) {}

  ngOnInit(): void {
    this.sessionService.getMentors().subscribe((data: any) => {
      this.mentors = data;
    });
  }

  scheduleSession() {
    const payload = {
      mentorId: this.selectedMentorId,
      scheduledAt: this.sessionTime
    };

    this.sessionService.scheduleSession(payload).subscribe({
      next: (res) => alert('Session Scheduled!'),
      error: (err) => console.error('Error scheduling session:', err)
    });
  }
}
