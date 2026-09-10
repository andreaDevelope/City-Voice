import { Component, Input } from '@angular/core';
import { StorySocial } from '../../models/story-social';

@Component({
  standalone: true,
  selector: 'app-story-card',
  templateUrl: './story-card.html',
  styleUrl: './story-card.scss',
})
export class StoryCard {
  @Input({ required: true }) story!: StorySocial;
}
