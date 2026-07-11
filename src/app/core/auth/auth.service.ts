import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { iAccessData } from './models/iAccessData';
import { iUser } from './models/iUser';
import { iLoginRequest } from './models/iLoginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'http://localhost:3000/api/auth/register';
  loginUrl = 'http://localhost:3000/api/auth/login';

  authSubject = new BehaviorSubject<iAccessData | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  register(newUser: iUser) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post<iAccessData>(this.loginUrl, authData);
  }

  saveAuth(accessData: iAccessData) {
    this.authSubject.next(accessData);
    localStorage.setItem('accessData', JSON.stringify(accessData));
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']);
  }

  getUser() {
    const auth = this.authSubject.value;
    return auth ? auth.user : null;
  }

  isLoggedIn() {
    return this.authSubject.value !== null;
  }
}
