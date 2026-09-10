import { Story } from './story';

export interface StorySocial extends Story {
  likes: number;
  badges: string[];
  avatar: string;
  commentsCount: number;
  comments: string[];
}
