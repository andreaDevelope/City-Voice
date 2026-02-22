/* eslint-disable @angular-eslint/prefer-inject */
import { afterNextRender, Component, Inject, PLATFORM_ID, signal, OnDestroy } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { HomeStats } from '../models/home-stats.model';
import { StoryPreview } from '../models/story-preview.model';
import { AppSignature } from '../models/app-signature.model';
import { HomeSlogan } from '../models/home-slogan.model';

interface HomeHeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnDestroy {
  readonly stats: HomeStats = {
    visits: 10,
    stories: 100,
  };

  readonly latestStory: StoryPreview = {
    district: 'QUARTIERE',
    date: '01-01-2026',
    description: 'descrizione della storia...',
  };

  readonly signature: AppSignature = {
    location: 'ROMA',
    year: '2026',
  };

  readonly heroSlides: HomeHeroSlide[] = [
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

  slogans: HomeSlogan[] = [
    {
      slogan: 'QUI NESSUNO È SOLO',
      description:
        'Uno spazio dove i cittadini romani raccontano storie reali di <em>ingiustizia, burocrazia e degrado.</em><br /> Perché nessuna voce deve rimanere inascoltata.',
    },
    {
      slogan: 'QUI NESSUNO È SOLO2',
      description:
        'Uno spazio dove i cittadini romani raccontano storie reali di <em>ingiustizia, burocrazia e degrado.</em><br /> Perché nessuna voce deve rimanere inascoltata.',
    },
    {
      slogan: 'QUI NESSUNO È SOLO3',
      description:
        'Uno spazio dove i cittadini romani raccontano storie reali di <em>ingiustizia, burocrazia e degrado.</em><br /> Perché nessuna voce deve rimanere inascoltata.',
    },
    {
      slogan: 'QUI NESSUNO È SOLO4',
      description:
        'Uno spazio dove i cittadini romani raccontano storie reali di <em>ingiustizia, burocrazia e degrado.</em><br /> Perché nessuna voce deve rimanere inascoltata.',
    },
    {
      slogan: 'QUI NESSUNO È SOLO5',
      description:
        'Uno spazio dove i cittadini romani raccontano storie reali di <em>ingiustizia, burocrazia e degrado.</em><br /> Perché nessuna voce deve rimanere inascoltata.',
    },
  ];

  currentIndex = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (!isPlatformBrowser(platformId)) return;

    afterNextRender(() => {
      this.timer = setInterval(() => {
        this.currentIndex.set((this.currentIndex() + 1) % this.heroSlides.length);
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
