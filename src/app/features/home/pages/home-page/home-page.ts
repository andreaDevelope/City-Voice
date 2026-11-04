/* eslint-disable @angular-eslint/prefer-inject */
import {
  afterNextRender,
  Component,
  computed,
  Inject,
  PLATFORM_ID,
  signal,
  OnDestroy,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PublicStats } from '../../models/public-stats';
import { StoryPreview } from '../../models/story-preview.model';
import { AppSignature } from '../../models/app-signature.model';
import { HomeSlogan } from '../../models/home-slogan.model';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';
import { DesktopButtonFancy } from '../../../../shared/ui/desktop-buttons/desktop-button-fancy';
import { RouterLink } from '@angular/router';
import { StatsService } from '../../services/stats.service';

interface HomeHeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [DesktopButtonDrawer, DesktopButtonFancy, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class Home implements OnDestroy {
  stats = signal<PublicStats | null>(null);
  membersCount = computed(() => this.stats()?.members ?? null);
  storiesCount = computed(() => {
    const stats = this.stats();
    return stats ? stats.stories + stats.reports : null;
  });

  readonly latestStory: StoryPreview = {
    district: 'QUARTIERE',
    date: '01-01-2026',
    description: 'descrizione della storia...',
  };

  readonly signature: AppSignature = {
    location: 'ROMA',
    year: '2026',
  };

  addStory = 'RACCONTA LA TUA STORIA';
  microTop = 'ANONIMO GARANTITO';
  microBotton = 'NO INFO PERSONALI';
  storiesList = 'LEGGI STORIE';
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

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private statsService: StatsService,
  ) {
    this.statsService.getPublicStats().subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => this.stats.set(null),
    });

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
