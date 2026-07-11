/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderApp } from '../header-app/header.app';
import { LoginDialogComponent } from '../../shared/components/account/authentication-dialogs/login-dialog';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderApp, LoginDialogComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  loginDialogOpen = false;
  constructor(
    private title: Title,
    private meta: Meta,
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
}
