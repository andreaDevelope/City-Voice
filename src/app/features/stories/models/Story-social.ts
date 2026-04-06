import { Story } from './story';

export interface StorySocial extends Story {
  likes: number;
  badjes: string[];
  avatar: string;
  commentsCount: number;
  comments: string[];
}
