import { StoryType } from './story-type';
import { ReportCategory } from '../enums/report-category';
import { StoryStatus } from '../enums/story-status';
import { CategoryProgress } from '../../profile/models/category-progress.model';

export interface CreateStoryRequest {
  type: StoryType;
  category: ReportCategory | null;
  districtId: number | null;
  title: string;
  description: string;
  storyContent: string;
}

export interface StoryResponse {
  id: string;
  type: StoryType;
  category: ReportCategory | null;
  district: string | null;
  title: string;
  description: string;
  storyContent: string;
  status: StoryStatus;
  createdAt: string;
  badgeProgress: CategoryProgress[];
}
