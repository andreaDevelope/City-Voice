import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthService } from './core/auth/auth.service';
import { catchError, of, tap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => {
        // Al startup, controlla se l'utente ha un cookie valido
        return authService.checkAuth().pipe(
          tap((authUser) => {
            // Utente autenticato, popola authSubject
            authService.authSubject.next(authUser as any); // Cast temporaneo
            // Avvia il timer per il refresh
            authService.startRefreshTimer();
          }),
          catchError(() => {
            // Nessun cookie valido o scaduto, utente anonimo
            authService.authSubject.next(null);
            return of(null);
          })
        ).toPromise() as Promise<any>;
      },
      deps: [AuthService],
      multi: true,
    }
  ]
};
