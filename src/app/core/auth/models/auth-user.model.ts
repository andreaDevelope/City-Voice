import { User } from './user.model';

export interface AuthUser {
  username: string;
  roles: string[];
  newToken?: string;
  user: User;
}
