import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('auth_token');
    
    // Redirect to Login Page after logout
    this.router.navigate(['/login']);
  }
}
