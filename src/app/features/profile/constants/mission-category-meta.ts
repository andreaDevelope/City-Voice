import { MissionCategory } from '../enums/mission-category';

export interface MissionCategoryMeta {
  label: string;
  iconPaths: string[];
}

export const MISSION_CATEGORY_META: Record<MissionCategory, MissionCategoryMeta> = {
  activity: {
    label: 'Attività',
    iconPaths: [
      'M49 9c-8-4-18 3-23 12l-8 25 25-8C54 31 59 17 49 9Z',
      'm12 53 30-30M23 37h15M29 29h15',
    ],
  },
  neighborhood: {
    label: 'Vicinato',
    iconPaths: ['M8 29 32 10l24 19M16 26v27h32V26M26 53V36h12v17', 'M42 12h8v12'],
  },
  continuity: {
    label: 'Continuità',
    iconPaths: [
      'M35 8c3 14-8 16-7 26-6-2-7-6-7-11C7 38 14 56 32 56c21 0 26-20 15-32-1 7-3 9-6 10 2-13-1-20-6-26Z',
      'M32 38c-9 9-8 17 1 17 11 0 10-10-1-17Z',
    ],
  },
  impact: {
    label: 'Impatto',
    iconPaths: ['m32 8 6 17 18 7-18 7-6 17-6-17-18-7 18-7Z', 'M50 8v10M45 13h10M12 47v10M7 52h10'],
  },
};
