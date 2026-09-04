import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { UserProfileDto } from '../models/user-profile.dto';
import { ProfileService } from '../services/profile.service';
import { ProfileSymbol } from '../enums/profile-symbol';
import { ProfileColor } from '../enums/profile-color';
import { PROFILE_COLOR_LABELS } from '../enums/profile-color-labels';
import { PROFILE_SYMBOL_LABELS } from '../enums/profile-symbol-labels';

@Component({
  standalone: true,
  selector: 'app-identity-dialog',
  imports: [],
  templateUrl: './identity-dialog.html',
  styleUrl: './identity-dialog.scss',
})
export class IdentityDialog implements OnInit {
  @Input({ required: true }) profile!: UserProfileDto;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() saved = new EventEmitter<UserProfileDto>();

  private profileService = inject(ProfileService);

  symbols = Object.values(ProfileSymbol);
  colors = Object.values(ProfileColor);
    symbolLabels = PROFILE_SYMBOL_LABELS;
  colorLabels = PROFILE_COLOR_LABELS;


  selectedSymbol = signal<ProfileSymbol>(ProfileSymbol.GENERIC);
  selectedColor = signal<ProfileColor>(ProfileColor.NEUTRAL);

  ngOnInit(): void {
    this.selectedSymbol.set(this.profile.symbol);
    this.selectedColor.set(this.profile.color);
  }

  selectSymbol(symbol: ProfileSymbol) {
    this.selectedSymbol.set(symbol);
  }

  selectColor(color: ProfileColor) {
    this.selectedColor.set(color);
  }

  save() {
    this.profileService
      .updateVisualIdentity({ symbol: this.selectedSymbol(), color: this.selectedColor() })
      .subscribe({
        next: (response) => {
          this.saved.emit({ ...this.profile, symbol: response.symbol, color: response.color });
        },
      });
  }

  close() {
    this.closeDialog.emit();
  }
}
