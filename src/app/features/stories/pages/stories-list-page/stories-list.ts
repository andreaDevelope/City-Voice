import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { StoryCard } from '../../components/story-card-components/story-card';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [StoryCard, RouterLink],
  templateUrl: './stories-list.html',
  styleUrl: './stories-list.scss',
})
export class StoriesList {
  stories: Story[] = [
    {
      category: 'Porcodio',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'Porcodio2',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO2',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'Porcodio3',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO3',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'Porcodio4',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO4',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
  ];
}
