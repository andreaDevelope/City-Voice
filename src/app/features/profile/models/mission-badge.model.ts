export interface MissionBadge {
  id: number;
  name: string;
  description: string;
  missionThreshold: number;
  sequenceOrder: number; // soglia del contatore per sbloccare questo badge
}
