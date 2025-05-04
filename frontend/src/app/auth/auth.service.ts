import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // saveProfileInfo(profileData:any):{
  //   this.http.put(`${environment.apiUrl}/profile/me`, profileData, this.headers).subscribe({
  //     next: (res: any) => {
  //       this.authService.saveUser(res.user);
  //     },
  //     error: (err) => {
  //       console.error('Login error:', err);
  //     }
  //   });
  // }
}
