import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderApp } from '../header-app/header.app';
import { LoginDialogComponent } from '../../features/auth/dialogs/login-dialog';
import { SignupDialogComponent } from '../../features/auth/dialogs/signup-dialog';
import { NavMobile } from '../nav-mobile/nav-mobile';
import { AuthPromptService } from '../../core/auth/auth-prompt.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderApp, NavMobile, LoginDialogComponent, SignupDialogComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  loginDialogOpen = false;

  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);
  private router: Router = inject(Router);
  private authPrompt: AuthPromptService = inject(AuthPromptService);

  // Il signup dialog è governato da AuthPromptService: si apre sia dal bottone
  // "Registrati" nell'header, sia da qualunque punto del codice (es. authGuard)
  // che non ha visibilità diretta su Shell.
  signupDialogOpen = this.authPrompt.isOpen;

  constructor() {
    this.title.setTitle('CityVoice-Roma non è in vendita');

    this.meta.updateTag({
      name: 'description',
      content:
        'Una piattaforma civica indipendente di denuncia e consapevolezza su Roma. Storie reali, problemi ignorati, voce collettiva.',
    });
  }

  openLoginDialog() {
    this.router.navigate(['/login']);
    this.loginDialogOpen = true;
  }
  closeLoginDialog() {
    this.loginDialogOpen = false;
  }

  openSignupDialog() {
    this.authPrompt.open();
  }
  closeSignupDialog() {
    this.authPrompt.close();
  }
}
