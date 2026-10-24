import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MISSION_CATEGORY_META } from '../../../profile/constants/mission-category-meta';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { toRoman } from '../../../../shared/utils/to-roman';
import { StoryCardItem } from '../../models/story-feed';
import { REPORT_CATEGORY_META } from '../../constants/report-category-meta';

@Component({
  selector: 'app-story-card',
  imports: [Avatar, DatePipe],
  templateUrl: './story-card.html',
  styleUrl: './story-card.scss',
})
export class StoryCard {
  readonly story = input.required<StoryCardItem>();
  protected readonly categoryMeta = REPORT_CATEGORY_META;

  protected readonly isReport = computed(() => this.story().type === 'REPORT');

  protected readonly badges = computed(() =>
    this.story().author.featuredBadges.map((badge) => ({
      level: toRoman(badge.sequenceOrder),
      label: MISSION_CATEGORY_META[badge.category].label,
      cssClass: 'badge-' + badge.category,
    })),
  );
}
