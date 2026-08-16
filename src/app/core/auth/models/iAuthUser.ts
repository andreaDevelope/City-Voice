import { iUser } from './iUser';

export interface iAuthUser {
  username: string;
  roles: string[];
  newToken?: string;
  user: iUser;
}
