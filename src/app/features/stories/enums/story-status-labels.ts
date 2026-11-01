import { StoryStatus } from './story-status';

export const STORY_STATUS_LABELS: Record<StoryStatus, string> = {
  [StoryStatus.IN_REVIEW]: 'In revisione',
  [StoryStatus.PUBLISHED]: 'Pubblicato',
  [StoryStatus.CHANGES_REQUESTED]: 'Modifica richiesta',
  [StoryStatus.BLOCKED]: 'Bloccato',
};
