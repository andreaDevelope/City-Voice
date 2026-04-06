import { StoryStatus } from './story-status';

export interface Story {
  category: string;
  district: string;
  date: string;
  title: string;
  description: string;
  storyContent: string;
  username: string;
  stato: StoryStatus;
}
