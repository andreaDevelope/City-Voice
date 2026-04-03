import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { StoryCard } from '../../components/story-card-components/story-card';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';
import { StoryCardEditorial } from '../../components/story-card-editorial-components/story-card-editorial';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [StoryCard, RouterLink, NgClass, DesktopButtonDrawer, StoryCardEditorial],
  templateUrl: './stories-list.html',
  styleUrl: './stories-list.scss',
})
export class StoriesList {
  addStory = 'RACCONTA LA TUA STORIA';
  microTop = 'ANONIMO GARANTITO';
  microBotton = 'NO INFO PERSONALI';
  manifestoIsShowMore = false;
  manifestoIsShowMoreDsk = false;
  categorySelected!: string;
  isSelectedAllCategory = true;
  stories: Story[] = [
    {
      category: 'categoria1',
      district: 'indirizzo1',
      date: '25-02-2026',
      title: 'TITOLO1',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user1',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      category: 'categoria2',
      district: 'indirizzo2',
      date: '25-02-2026',
      title: 'TITOLO2',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user2',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      category: 'categoria3',
      district: 'indirizzo3',
      date: '25-02-2026',
      title: 'TITOLO3',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user3',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      category: 'categoria4',
      district: 'indirizzo',
      date: '25-02-2026',
      title: 'TITOLO4',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user4',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
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

  manifestoShowMoreToggleDsk() {
    this.manifestoIsShowMoreDsk = !this.manifestoIsShowMoreDsk;
  }
}
