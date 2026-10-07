import { Component, input } from '@angular/core';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { ProfileSymbol } from '../../../profile/enums/profile-symbol';
import { ProfileColor } from '../../../profile/enums/profile-color';

@Component({
  selector: 'app-author-chip',
  imports: [Avatar],
  templateUrl: './author-chip.html',
  styleUrl: './author-chip.scss',
})
export class AuthorChip {
  readonly username = input.required<string>();
  readonly symbol = input<ProfileSymbol | null | undefined>();
  readonly color = input<ProfileColor | null | undefined>();
}
