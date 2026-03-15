import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { StoryCard } from '../../components/story-card-components/story-card';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [StoryCard, RouterLink, NgClass, DesktopButtonDrawer],
  templateUrl: './stories-list.html',
  styleUrl: './stories-list.scss',
})
export class StoriesList {
  addStory = 'RACCONTA LA TUA STORIA';
  microTop = 'ANONIMO GARANTITO';
  microBotton = 'NO INFO PERSONALI';
  manifestoIsShowMore = false;
  categorySelected!: string;
  isSelectedAllCategory = true;
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

  categories: string[] = [...new Set(this.stories.map((s) => s.category))];

  getStoriesForCategoryNumber(param: string): number {
    let storiesForCategoryCount = 0;
    this.stories.filter((s) => {
      if (s.category === param) {
        storiesForCategoryCount++;
      }
    });
    return storiesForCategoryCount;
  }

  getCategorySelected(param: string): void {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.categories.length; i++) {
      if (param === this.categories[i]) {
        this.categorySelected = this.categories[i];
        this.isSelectedAllCategory = false;
        return;
      } else {
        this.categorySelected = 'tutte';
        this.isSelectedAllCategory = true;
      }
    }
  }

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
      this.categorySelected = category;
      return;
    }
    this.filtredStories = this.stories.filter((s) => s.category === category.toLocaleLowerCase());
    this.categorySelected = category;
  }

  manifestoShowMoreToggle() {
    this.manifestoIsShowMore = !this.manifestoIsShowMore;
  }
}
