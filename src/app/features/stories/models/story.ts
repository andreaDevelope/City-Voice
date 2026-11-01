import { StoryStatus } from '../enums/story-status';

export interface Story {
  category: string;
  district: string;
  date: string;
  title: string;
  description: string;
  storyContent: string;
  username: string;
  state: StoryStatus;
}
