import { Component, Input } from '@angular/core';
import { StorySocial } from '../../models/story-social';

@Component({
  standalone: true,
  selector: 'app-story-card-editorial',
  templateUrl: './story-card-editorial.html',
  styleUrl: './story-card-editorial.scss',
})
export class StoryCardEditorial {
  @Input({ required: true }) story!: StorySocial;
}
