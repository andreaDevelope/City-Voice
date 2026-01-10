/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderManifestoMobile } from '../header-manifesto-mobile/header.manifesto.mobile';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderManifestoMobile],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
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
}
