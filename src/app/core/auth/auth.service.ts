import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { iAccessData } from './models/iAccessData';
import { iUser } from './models/iUser';
import { iLoginRequest } from './models/iLoginRequest';
import { iAuthUser } from './models/iAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'http://localhost:8080/api/auth/register';
  loginUrl = 'http://localhost:8080/api/auth/login';

  authSubject = new BehaviorSubject<iAccessData | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  register(newUser: iUser) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post(this.loginUrl, authData, {
      withCredentials: true,
    });
  }

  checkAuth() {
    return this.http.get<iAuthUser>('http://localhost:8080/api/auth/me', {
      withCredentials: true,
    });
  }

  refreshToken() {
    return this.http.post('http://localhost:8080/api/auth/refresh-token', {}, {
      withCredentials: true,
    });
  }

  private refreshTimerId: ReturnType<typeof setTimeout> | null = null;

  startRefreshTimer() {
    // Token vive 86400 secondi (24 ore)
    // Refresh 300 secondi PRIMA (5 minuti prima)
    const refreshMs = (86400 - 300) * 1000;

    // Cancella timer precedente se esiste
    if (this.refreshTimerId) {
      clearTimeout(this.refreshTimerId);
    }

    // Avvia nuovo timer
    this.refreshTimerId = setTimeout(() => {
      this.refreshToken().subscribe({
        next: () => {
          console.log('Token refreshed successfully');
          this.startRefreshTimer(); // Riavvia il timer
        },
        error: (err) => {
          console.error('Token refresh failed:', err);
          // Opzionale: reindirizza a login se refresh fallisce
          this.logout();
        }
      });
    }, refreshMs);
  }

  stopRefreshTimer() {
    if (this.refreshTimerId) {
      clearTimeout(this.refreshTimerId);
      this.refreshTimerId = null;
    }
  }

  saveAuth(accessData: iAccessData) {
    this.authSubject.next(accessData);
  }

  logout() {
    this.stopRefreshTimer();
    this.authSubject.next(null);
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
