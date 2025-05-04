import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';  // Make sure to adjust the path
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  bio: string = '';
  techStack: string = '';
  role: string = '';
  // Add any other fields as necessary

  constructor(private authService: AuthService, private router: Router, private apiService:ApiService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Assuming AuthService is responsible for fetching user data
    const user = this.authService.getUser();
    this.name = user?.name || '';
    this.email = user?.email || '';
    this.role = user?.role || '';
    this.techStack = user?.techStack || '';
    this.bio = user?.bio || '';
    // Load any other user data you need
  }

  // This could be used to save the updated profile if necessary
  updateProfile(): void {
    // Call an API or handle updating the profile here
    const profile = {
          email: this.email,
          name :this.name || '',
          role :this.role || '',
          techStack :this.techStack || '',
          bio :this.bio || '',
        };
        console.log(profile);
        this.apiService.put("/profile/me", profile).subscribe(res=>{
          console.log(res)
          alert("Profile Updated");
        });
    console.log('Profile updated!');
  }
}
