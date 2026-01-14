/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderSlogan } from '../models/header-slogan.model';

@Component({
  standalone: true,
  selector: 'app-header-app-mobile',
  templateUrl: './header.app.mobile.html',
  styleUrls: ['./header.app.mobile.scss'],
})
export class HeaderAppMobile implements OnDestroy {
  slogans: HeaderSlogan[] = [
    {
      title: 'Roma non è in vendita',
      subtitle: 'Una città abbandonata non è una fatalità.',
      image: '/assets/images/header/header-rome-collapse-01.jpg',
    },
    {
      title: 'Siamo stanchi',
      subtitle: 'Ma non invisibili.',
      image: '/assets/images/header/header-rome-solidarity-01.jpg',
    },
    {
      title: 'Qui nessuno è solo',
      subtitle: 'Le storie contano.',
      image: '/assets/images/header/header-rome-fire-01.jpeg',
    },
  ];

  currentIndex = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (!isPlatformBrowser(platformId)) return;

    afterNextRender(() => {
      this.timer = setInterval(() => {
        this.currentIndex.set((this.currentIndex() + 1) % this.slogans.length);
      }, 4500);
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
