import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { StoryCard } from '../../components/story-card-components/story-card';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [StoryCard, RouterLink, NgClass],
  templateUrl: './stories-list.html',
  styleUrl: './stories-list.scss',
})
export class StoriesList {
  manifestoIsShowMore = false;
  selectedCategory = 'tutte';
  stories: Story[] = [
    {
      category: 'porcodio',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'porcodio2',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO2',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'porcodio3',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO3',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
    {
      category: 'porcodio4',
      district: 'Sottocasa',
      date: '25-02-2026',
      title: 'PORCODIO4',
      description:
        'Porcodio e la madonna e tutti gli angeli in colonna li ho contati son 31 porco dio ne manca 1',
    },
  ];

  filtredStories: Story[] = this.stories;

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLocaleLowerCase();

    if (value === 'tutte' || value === '') {
      this.filtredStories = this.stories;
      return;
    }

    this.filtredStories = this.stories.filter((s) => s.category.includes(value));
  }

  filterCategory(category: string) {
    if (category === 'tutte' || category === '') {
      this.filtredStories = this.stories;
      this.selectedCategory = category;
      return;
    }
    this.filtredStories = this.stories.filter((s) =>
      s.category.includes(category.toLocaleLowerCase()),
    );
    this.selectedCategory = category;
  }

  manifestoShowMoreToggle() {
    this.manifestoIsShowMore = !this.manifestoIsShowMore;
  }
}
