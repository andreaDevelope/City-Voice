import { MissionCategory } from '../enums/mission-category';

export interface UnlockedBadgeDto {
  badgeId: number;
  name: string;
  description: string;
  category: MissionCategory;
  sequenceOrder: number;
  unlockedAt: string;
  featuredPosition: number | null;
}
