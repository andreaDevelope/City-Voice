import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { iUser } from './models/iUser';
import { iLoginRequest } from './models/iLoginRequest';
import { iAuthUser } from './models/iAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'http://localhost:8080/api/auth/register';
  loginUrl = 'http://localhost:8080/api/auth/login';
  recoveryUrl = 'http://localhost:8080/api/auth/recovery';

  authSubject = new BehaviorSubject<iAuthUser | null>(null);

  isLoggedIn = toSignal(this.authSubject.pipe(map((user) => user !== null)), {
    initialValue: this.authSubject.value !== null,
  });

  private http = inject(HttpClient);
  private router = inject(Router);

  register(newUser: iUser) {
    return this.http.post<iAuthUser>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post(this.loginUrl, authData);
  }

  checkAuth() {
    return this.http.get<iAuthUser>('http://localhost:8080/api/auth/me');
  }

  refreshToken() {
    return this.http.post('http://localhost:8080/api/auth/refresh-token', {});
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
          this.router.navigate(['/']);
          this.logout();
        },
      });
    }, refreshMs);
  }

  stopRefreshTimer() {
    if (this.refreshTimerId) {
      clearTimeout(this.refreshTimerId);
      this.refreshTimerId = null;
    }
  }

  saveAuth(accessData: iAuthUser) {
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

  recoverAccount(data: { username: string; recoveryKey: string; newPassword: string }) {
    return this.http.post(this.recoveryUrl, data, { responseType: 'text' });
  }
}
