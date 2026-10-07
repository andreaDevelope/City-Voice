import { StoryType } from './story-type';
import { CategoryProgress } from '../../profile/models/category-progress.model';

export interface CreateStoryRequest {
  type: StoryType;
  category: string | null;
  districtId: number | null;
  title: string;
  description: string;
  storyContent: string;
}

export interface StoryResponse {
  id: string;
  type: StoryType;
  category: string | null;
  district: string | null;
  title: string;
  description: string;
  storyContent: string;
  status: string;
  createdAt: string;
  badgeProgress: CategoryProgress[];
}
