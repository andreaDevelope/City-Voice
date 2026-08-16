import { Story } from '../../../features/stories/models/story';

export interface iUser {
  username?: string;
  stories?: Story[];
  password?: string;
}
