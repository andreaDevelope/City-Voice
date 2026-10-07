import { Component, OnInit, inject, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserProfileDto } from '../../models/user-profile.dto';
import { ProfileSymbol } from '../../enums/profile-symbol';
import { ProfileColor } from '../../enums/profile-color';
import { PROFILE_SYMBOL_LABELS } from '../../enums/profile-symbol-labels';
import { PROFILE_COLOR_LABELS } from '../../enums/profile-color-labels';
import { CategoryProgress } from '../../models/category-progress.model';
import { ProgressDots } from '../../../../shared/ui/progress-dots/progress-dots';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { MISSION_CATEGORY_META } from '../../constants/mission-category-meta';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [ProgressDots, Avatar],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);

  profile = signal<UserProfileDto | null>(null);
  progress = signal<CategoryProgress[]>([]);

  missionCategories = [
    { key: 'activity', cssClass: 'attivita', label: MISSION_CATEGORY_META.activity.label },
    { key: 'neighborhood', cssClass: 'quartiere', label: MISSION_CATEGORY_META.neighborhood.label },
    { key: 'continuity', cssClass: 'continuita', label: MISSION_CATEGORY_META.continuity.label },
    { key: 'impact', cssClass: 'impatto', label: MISSION_CATEGORY_META.impact.label },
  ];

  ngOnInit(): void {
    this.profileService.getMyBadgeProgress().subscribe({
      next: (data) => this.progress.set(data),
    });
    this.profileService.getMyProfile().subscribe({
      next: (data) => this.profile.set(data),
    });
  }

  getProgressFor(category: string): CategoryProgress | undefined {
    return this.progress().find((p) => p.category === category);
  }

  symbols = Object.values(ProfileSymbol);
  colors = Object.values(ProfileColor);
  symbolLabels = PROFILE_SYMBOL_LABELS;
  colorLabels = PROFILE_COLOR_LABELS;

  selectSymbol(symbol: ProfileSymbol) {
    const current = this.profile();
    if (!current) return;
    this.profileService.updateVisualIdentity({ symbol, color: current.color }).subscribe({
      next: (response) => {
        this.profile.update((p) => (p ? { ...p, symbol: response.symbol } : p));
      },
    });
  }

  selectColor(color: ProfileColor) {
    const current = this.profile();
    if (!current) return;
    this.profileService.updateVisualIdentity({ symbol: current.symbol, color }).subscribe({
      next: (response) => {
        this.profile.update((p) => (p ? { ...p, color: response.color } : p));
      },
    });
  }

  getColorClass(color: ProfileColor): string {
    const selected = this.profile()?.color === color ? ' selected' : '';
    return `color color-${color}` + selected;
  }
}
