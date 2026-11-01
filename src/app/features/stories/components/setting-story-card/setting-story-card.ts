import { Component, Input } from '@angular/core';
import { Story } from '../../models/story';
import { STORY_STATUS_LABELS } from '../../enums/story-status-labels';

@Component({
  standalone: true,
  selector: 'app-setting-story-card',
  imports: [],
  templateUrl: './setting-story-card.html',
  styleUrl: './setting-story-card.scss',
})
export class SettingStoryCard {
  @Input({ required: true }) story!: Story;
  protected readonly statusLabels = STORY_STATUS_LABELS;
}
