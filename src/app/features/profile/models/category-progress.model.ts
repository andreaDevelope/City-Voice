import { MissionCategory } from '../enums/mission-category';
import { MissionBadge } from './mission-badge.model';

export interface CategoryProgress {
  category: MissionCategory;
  currentBadge: MissionBadge;
  nextBadge: MissionBadge | null; // null se è l'ultimo badge della sequenza
  counter: number; // valore attuale verso currentBadge.badgeMissions
}
