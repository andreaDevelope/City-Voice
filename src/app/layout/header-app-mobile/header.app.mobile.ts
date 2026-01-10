/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header-app-mobile',
  templateUrl: './header.app.mobile.html',
  styleUrls: ['./header.app.mobile.scss'],
})
export class HeaderAppMobile implements OnDestroy {
  slogans = [
    { title: 'Roma non è in vendita', subtitle: 'Una città abbandonata non è una fatalità.' },
    { title: 'Siamo stanchi', subtitle: 'Ma non invisibili.' },
    { title: 'Qui nessuno è solo', subtitle: 'Le storie contano.' },
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
