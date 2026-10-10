import { StoryType } from './story-type';
import { ProfileSymbol } from '../../profile/enums/profile-symbol';
import { ProfileColor } from '../../profile/enums/profile-color';
import { MissionCategory } from '../../profile/enums/mission-category';

export interface AuthorBadge {
  id: number;
  name: string;
  category: MissionCategory;
  sequenceOrder: number;
}

export interface StoryAuthor {
  username: string;
  symbol: ProfileSymbol;
  color: ProfileColor;
  featuredBadges: AuthorBadge[];
}

export interface StoryCardItem {
  id: string;
  type: StoryType;
  title: string;
  preview: string | null;
  category: string | null;
  district: string | null;
  municipio: string | null;
  municipioLabel: string | null;
  createdAt: string;
  author: StoryAuthor;
  likes: number;
  dislikes: number;
  comments: number;
}

export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  hasNext: boolean;
}

export interface CategoryCount {
  category: string;
  count: number;
}
