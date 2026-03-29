import { Component, Input } from '@angular/core';
import { Story } from '../../models/story';

@Component({
  standalone: true,
  selector: 'app-story-card-editorial',
  templateUrl: './story-card-editorial.html',
  styleUrl: './story-card-editorial.scss',
})
export class StoryCardEditorial {
  @Input({ required: true }) story!: Story;
}
