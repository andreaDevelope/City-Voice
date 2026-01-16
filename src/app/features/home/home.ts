import { Component } from '@angular/core';
import { HomeStats } from './models/home-stats.model';
import { StoryPreview } from './models/story-preview.model';
import { AppSignature } from './models/app-signature.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly stats: HomeStats = {
    visits: 10,
    stories: 100,
  };

  readonly latestStory: StoryPreview = {
    district: 'QUARTIERE',
    date: '01-01-2026',
    description: 'descrizione della storia...',
  };

  readonly signature: AppSignature = {
    location: 'ROMA',
    year: '2026',
  };
}
