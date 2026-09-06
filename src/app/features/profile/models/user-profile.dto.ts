import { ProfileSymbol } from '../enums/profile-symbol';
import { ProfileColor } from '../enums/profile-color';
import { FeaturedBadge } from './featured-badge.model';

export interface UserProfileDto {
  username: string;
  symbol: ProfileSymbol;
  color: ProfileColor;
  neighborhood?: string;
  featuredBadges?: FeaturedBadge[];
}
