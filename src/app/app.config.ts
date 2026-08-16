import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthService } from './core/auth/auth.service';
import { HttpCredentialsInterceptor } from './core/http/http-credentials.interceptor';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCredentialsInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => {
        return firstValueFrom(
          authService.checkAuth().pipe(
            tap((authUser) => {
              authService.authSubject.next(authUser);
              authService.startRefreshTimer();
            }),
            catchError(() => {
              authService.authSubject.next(null);
              return of(null);
            }),
          ),
        );
      },
      deps: [AuthService],
      multi: true,
    },
  ],
};
