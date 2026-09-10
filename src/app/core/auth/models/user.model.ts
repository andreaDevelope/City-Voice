import { Story } from '../../../features/stories/models/story';

export interface User {
  username?: string;
  stories?: Story[];
  password?: string;
}
