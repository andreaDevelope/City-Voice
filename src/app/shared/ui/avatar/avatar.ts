import { Component, input } from '@angular/core';
import { ProfileSymbol } from '../../../features/profile/enums/profile-symbol';
import { ProfileColor } from '../../../features/profile/enums/profile-color';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly symbol = input<ProfileSymbol | null | undefined>();
  readonly color = input<ProfileColor | null | undefined>();
}
