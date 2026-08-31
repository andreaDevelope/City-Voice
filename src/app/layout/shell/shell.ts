import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderApp } from '../header-app/header.app';
import { LoginDialogComponent } from '../../features/auth/dialogs/login/login-dialog';
import { SignupDialogComponent } from '../../features/auth/dialogs/signup/signup-dialog';
import { RecoveryKeyDialogComponent } from '../../features/auth/dialogs/recovery-key/recovery-key-dialog';
import { NavMobile } from '../nav-mobile/nav-mobile';
import { AuthPromptService } from '../../core/auth/auth-prompt.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    HeaderApp,
    NavMobile,
    LoginDialogComponent,
    SignupDialogComponent,
    RecoveryKeyDialogComponent,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);
  private authPrompt: AuthPromptService = inject(AuthPromptService);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  loginDialogOpen = this.authPrompt.isLoginOpen;
  signupDialogOpen = this.authPrompt.isSignupOpen;
  recoveryKeyOpen = this.authPrompt.isRecoveryKeyOpen;
  recoveryKey = this.authPrompt.recoveryKey;

  constructor() {
    this.title.setTitle('CityVoice-Roma non è in vendita');

    this.meta.updateTag({
      name: 'description',
      content:
        'Una piattaforma civica indipendente di denuncia e consapevolezza su Roma. Storie reali, problemi ignorati, voce collettiva.',
    });
  }

  openLoginDialog() {
    this.authPrompt.openLogin();
  }

  closeLoginDialog() {
    this.authPrompt.close();
  }

  openSignupDialog() {
    this.authPrompt.openSignup();
  }

  closeSignupDialog() {
    this.authPrompt.close();
  }

  onRegistered(key: string) {
    this.authPrompt.openRecoveryKey(key);
  }

  onRecoveryKeyConfirmed() {
    this.authPrompt.close();
  }

  switchToSignup() {
    this.authPrompt.openSignup();
  }
}
