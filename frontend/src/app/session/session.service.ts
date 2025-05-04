import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMentors() {
    return this.http.get(`${this.api}/mentors`);
  }

  scheduleSession(data: any) {
    return this.http.post(`${this.api}/sessions`, data);
  }
}
