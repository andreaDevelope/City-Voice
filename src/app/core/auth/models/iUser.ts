import { Story } from '../../../features/stories/models/story';

export interface iUser {
  id?: string;
  username?: string;
  stories?: Story[];
  password?: string;
}
