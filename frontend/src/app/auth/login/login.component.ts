import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    const token = this.authService.getToken();
  }

  ngOnInit(): void {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };
    console.log(credentials);
    this.http.post(`${environment.apiUrl}/auth/login`, credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);
        this.router.navigate(['/home']);  // Navigate to the dashboard (or home)
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }
}
