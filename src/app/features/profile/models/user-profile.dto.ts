import { ProfileSymbol } from '../enums/profile-symbol';
import { ProfileColor } from '../enums/profile-color';

export interface UserProfileDto {
  username: string;
  symbol: ProfileSymbol;
  color: ProfileColor;
  neighborhood?: string;
}
