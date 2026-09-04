import { Component, OnInit, inject, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserProfileDto } from '../../models/user-profile.dto';
import { ProfileSymbol } from '../../enums/profile-symbol';
import { ProfileColor } from '../../enums/profile-color';
import { PROFILE_SYMBOL_LABELS } from '../../enums/profile-symbol-labels';
import { PROFILE_COLOR_LABELS } from '../../enums/profile-color-labels';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);

  profile = signal<UserProfileDto | null>(null);

  attivitaMissions: {
    badje: { badjeImg: string; badjeName: string; badjeDescription: string };
    missione: { active: boolean; progress: number };
  }[] = [
    {
      badje: {
        badjeImg: '',
        badjeName: 'badje1',
        badjeDescription: 'hai inviato le tue prime 3 segnalazioni',
      },
      missione: {
        active: true,
        progress: 2,
      },
    },
  ];

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe({
      next: (data) => this.profile.set(data),
    });
  }

  symbols = Object.values(ProfileSymbol);
  colors = Object.values(ProfileColor);
  symbolLabels = PROFILE_SYMBOL_LABELS;
  colorLabels = PROFILE_COLOR_LABELS;

  selectSymbol(symbol: ProfileSymbol) {
    this.profileService.updateVisualIdentity({ symbol, color: this.profile()!.color }).subscribe({
      next: (response) => {
        this.profile.update((p) => (p ? { ...p, symbol: response.symbol } : p));
      },
    });
  }

  selectColor(color: ProfileColor) {
    this.profileService.updateVisualIdentity({ symbol: this.profile()!.symbol, color }).subscribe({
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
