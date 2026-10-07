import { MissionCategory } from '../../../../features/profile/enums/mission-category';
import { MissionBadge } from '../../../../features/profile/models/mission-badge.model';

export interface UnlockedBadge {
  badge: MissionBadge;
  category: MissionCategory;
}
