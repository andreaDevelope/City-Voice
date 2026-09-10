import { Component, Input } from '@angular/core';
import { Story } from '../../models/story';

@Component({
  standalone: true,
  selector: 'app-setting-story-card',
  imports: [],
  templateUrl: './setting-story-card.html',
  styleUrl: './setting-story-card.scss',
})
export class SettingStoryCard {
  @Input({ required: true }) story!: Story;
}
