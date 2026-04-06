import { Component } from '@angular/core';
import { StoryCard } from '../../components/story-card-components/story-card';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';
import { StoryCardEditorial } from '../../components/story-card-editorial-components/story-card-editorial';
import { StorySocial } from '../../models/Story-social';
import { StoryStatus } from '../../models/story-status';

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
  stories: StorySocial[] = [
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria1',
      district: 'indirizzo1',
      date: '25-02-2026',
      title: 'TITOLO1',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user1',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria2',
      district: 'indirizzo2',
      date: '25-02-2026',
      title: 'TITOLO2',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user2',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria3',
      district: 'indirizzo3',
      date: '25-02-2026',
      title: 'TITOLO3',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user3',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria4',
      district: 'indirizzo',
      date: '25-02-2026',
      title: 'TITOLO4',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        ' Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet',
      username: 'user4',
      likes: 10,
      badjes: [],
      avatar: '',
      commentsCount: 3,
      comments: [],
    },
  ];

  filtredStories: StorySocial[] = this.stories;

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
