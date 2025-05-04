import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; // Adjust the path based on your project structure
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Import environment
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  role = '';
  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    
  }
  register() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };
    console.log(user);

    this.http.post(`${environment.apiUrl}/auth/register`, user).subscribe({
      next: (res) => {
        console.log('Registered:', res);
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Register error:', err)
    });
  }
}
