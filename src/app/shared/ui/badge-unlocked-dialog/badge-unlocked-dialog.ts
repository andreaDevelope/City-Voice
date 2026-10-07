import { afterNextRender, Component, computed, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MISSION_CATEGORY_META } from '../../../features/profile/constants/mission-category-meta';
import { toRoman } from '../../utils/to-roman';
import { UnlockedBadge } from './models/unlocked-badge.model';

@Component({
  selector: 'app-badge-unlocked-dialog',
  imports: [RouterLink],
  templateUrl: './badge-unlocked-dialog.html',
  styleUrl: './badge-unlocked-dialog.scss',
})
export class BadgeUnlockedDialog {
  readonly badges = input.required<UnlockedBadge[]>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly index = signal(0);
  protected readonly current = computed(() => this.badges()[this.index()]);
  protected readonly meta = computed(() => MISSION_CATEGORY_META[this.current().category]);
  protected readonly level = computed(() => toRoman(this.current().badge.sequenceOrder));
  protected readonly total = computed(() => this.badges().length);
  protected readonly isLast = computed(() => this.index() === this.total() - 1);

  constructor() {
    afterNextRender(() => this.dialog().nativeElement.showModal());
  }

  protected next(): void {
    if (this.isLast()) {
      this.dialog().nativeElement.close();
    } else {
      this.index.update((i) => i + 1);
    }
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected onClose(): void {
    this.closed.emit();
  }
}
