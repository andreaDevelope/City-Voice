import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderApp } from '../header-app/header.app';
import { LoginDialogComponent } from '../../shared/components/account/authentication-dialogs/login-dialog';
import { SignupDialogComponent } from '../../shared/components/account/authentication-dialogs/signup-dialog';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderApp, LoginDialogComponent, SignupDialogComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  loginDialogOpen = false;
  signupDialogOpen = false;
  private title: Title = inject(Title);
  private meta: Meta = inject(Meta);

  constructor(
  ) {
    this.title.setTitle('CityVoice-Roma non è in vendita');

    this.meta.updateTag({
      name: 'description',
      content:
        'Una piattaforma civica indipendente di denuncia e consapevolezza su Roma. Storie reali, problemi ignorati, voce collettiva.',
    });
  }

  openLoginDialog() {
    this.loginDialogOpen = true;
  }
  closeLoginDialog() {
    this.loginDialogOpen = false;
  }

  openSignupDialog(){
     this.signupDialogOpen = true;
  }
  closeSignupDialog() {
    this.signupDialogOpen = false;
  }
}
