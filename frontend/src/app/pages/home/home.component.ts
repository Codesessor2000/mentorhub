// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  availability = {
    day: '',
    startTime: '',
    endTime: ''
  };
  menteeAvailability = {
    id:'',
    day: '',
    startTime: '',
    endTime: ''
  };
  role: any;
  slots: any[] = [];
  mentors: any;
  mentorObj = {
    id:'',
    name:'',
  }
  feedBackObj:any;
  availabilitySlots: any;
  selectedSlot: any;
  sessionRequests: any;
  upcomingSessions: any;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.role = this.authService.getUser().role;
    if(this.role=="mentor"){
      this.apiService.get("/availability").subscribe((res:any)=>{
        console.log(res.availabilitySlots);
        this.slots = res.availabilitySlots;
      })

      this.apiService.get("/sessions/my-requests").subscribe((res:any)=>{
        console.log(res.sessions);
        this.sessionRequests = res.sessions;
      })

      this.apiService.get("/sessions/get-mentor-sessions").subscribe((res:any)=>{
        console.log(res.sessions);
        this.upcomingSessions = res.sessions;
      })
    }else{
      this.apiService.get("/availability/mentors").subscribe((res:any)=>{
        console.log(res.mentors);
        this.mentors = res.mentors;
      });
      this.apiService.get("/sessions/get-mentee-sessions").subscribe((res:any)=>{
        console.log(res.sessions);
        this.upcomingSessions = res.sessions;
      })
    }
  }

  submitAvailability() {
    console.log('Availability:', this.availability);
    // You can now send this.availability to your backend
    this.apiService.post("/availability",this.availability).subscribe(res=>{
      console.log(res);
      alert("Availability Saved")
      
    })

  }


  addSlot() {
    this.submitAvailability();
    this.slots.push({ ...this.availability });
    this.availability = { day: '', startTime: '', endTime: '' };
  }

  deleteSlot(index: number) {
    console.log(this.slots[index].id)
    this.apiService.delete(`/availability/${this.slots[index].id}`).subscribe(res=>{
      this.slots.splice(index, 1);
    })
  }

  editSlot(index: number){
    console.log(this.slots[index].id);
    this.apiService.put(`/availability/${this.slots[index].id}`, this.availability).subscribe(res=>{
      this.slots.splice(index, 1);
    })
  }
  requestSlot(){
    let payload = {
      "mentorId": this.mentorObj.id,
      "date": new Date(),
      "startTime": this.selectedSlot.startTime,
      "endTime": this.selectedSlot.endTime,
      "notes": "Need help with backend structure"
    }
    this.apiService.post("/sessions/request",payload).subscribe(res=>{
      alert("session requested");
    });
  }
  onSelectMentor(id: any){
    let m = this.mentors.find((mentor:any)=>mentor.id==id);
    console.log(m);
    this.availabilitySlots = m.availabilitySlots;
    console.log(this.availabilitySlots);
  }
  onSelectSlot(id:any){
    let s = this.availabilitySlots.find((a:any)=>a.id==id);
    this.selectedSlot = s;
  }
  approveSlot(id:any){
    let s = this.sessionRequests.find((sr:any)=>sr.id==id);
    this.apiService.patch(`/sessions/${id}/approve`,{}).subscribe((res:any)=>{
      alert("approved request");
      let payload = {
        "sessionRequestId": id
      }
      this.apiService.post("/sessions",payload).subscribe((res:any)=>{
        alert("session created");
      })
    });

  } 
  rejectSlot(id:any){
    let s = this.sessionRequests.find((sr:any)=>sr.id==id);
    this.apiService.patch(`/sessions/${s.id}/decline`,{}).subscribe((res:any)=>{
      alert("declined request");
    });
  }
  joinMeeting(link:any){
    window.open(`https://meet.google.com/vpo-jkrm-tda`, '_blank');
  }
  giveFeedback(id: any){
    let ratingStr = prompt("Rating (1–5):");
    let rating = parseInt(ratingStr || '', 10);
    let comment = prompt("comment", "");
    console.log(rating,comment)
    const payload ={
        "sessionId": id,
        "rating": rating,
        "comment": comment
      }
      if(this.role=="mentee"){
        this.apiService.post("/feedback/mentee",payload).subscribe((res:any)=>{
          alert("feedback sent")
        })
      }else{
        this.apiService.post("/feedback/mentor",payload).subscribe((res:any)=>{
          alert("feedback sent")
        })
      }
  }
  viewFeedback(id:any){
    this.apiService.get(`/feedback/${id}`).subscribe((res:any)=>{
      this.feedBackObj = res.feedback[0];
      console.log(this.feedBackObj);
      if(this.role=="mentor"){
        if(this.feedBackObj.mentorRating){
          alert(`rating: ${this.feedBackObj.mentorRating}-${this.feedBackObj.mentorComment}`)
        }else{
          alert(`feedback not received yet`)
        }
      }else{
        if(this.feedBackObj.menteeRating){
          alert(`rating: ${this.feedBackObj.menteeRating}-${this.feedBackObj.menteeComment}`)
        }else{
          alert(`feedback not received yet`)
        }
      }
    })
  }

  
}
