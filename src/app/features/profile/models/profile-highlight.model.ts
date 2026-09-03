import { FeaturedBadge } from "./featured-badge.model";

export interface ProfileHighlight {
  username: string;
  symbol: string; //es. 'degrado-urbano'
  color: string; //'neutro' | 'denuncia' | 'attenzione' | 'impatto' | 'discrezione'
  neighborhood: string | null; // null finché il BE non lo supporta
  featuredBadges: FeaturedBadge[]; // max 3
}
