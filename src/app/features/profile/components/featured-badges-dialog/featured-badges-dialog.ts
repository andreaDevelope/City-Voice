import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BadgeMedallion } from '../../../../shared/ui/badge-medallion/badge-medallion';
import { toRoman } from '../../../../shared/utils/to-roman';
import { FEATURED_BADGES_MAX } from '../../constants/featured-badges';
import { MISSION_CATEGORY_META } from '../../constants/mission-category-meta';
import { MissionCategory } from '../../enums/mission-category';
import { UnlockedBadgeDto } from '../../models/unlocked-badge.dto';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-featured-badges-dialog',
  imports: [BadgeMedallion],
  templateUrl: './featured-badges-dialog.html',
  styleUrl: './featured-badges-dialog.scss',
})
export class FeaturedBadgesDialog {
  private readonly profileService = inject(ProfileService);
  private readonly destroyRef = inject(DestroyRef);

  readonly badges = input.required<UnlockedBadgeDto[]>();
  readonly saved = output<UnlockedBadgeDto[]>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly maxBadges = FEATURED_BADGES_MAX;

  // Local copy of the featured badges: the hero changes only after Save.
  protected readonly selected = linkedSignal(() =>
    this.badges()
      .filter((badge) => badge.featuredPosition !== null)
      .sort((a, b) => (a.featuredPosition ?? 0) - (b.featuredPosition ?? 0)),
  );

  protected readonly slots = computed(() =>
    Array.from({ length: FEATURED_BADGES_MAX }, (_, i) => this.selected()[i] ?? null),
  );

  // Same order as the backend (unlock date), without the selected ones.
  protected readonly available = computed(() => {
    const selectedIds = new Set(this.selected().map((badge) => badge.badgeId));
    return this.badges().filter((badge) => !selectedIds.has(badge.badgeId));
  });

  // Available badges grouped by category (enum order), each group by ascending level.
  protected readonly availableGroups = computed(() =>
    Object.values(MissionCategory)
      .map((category) => ({
        category,
        label: MISSION_CATEGORY_META[category].label,
        badges: this.available()
          .filter((badge) => badge.category === category)
          .sort((a, b) => a.sequenceOrder - b.sequenceOrder),
      }))
      .filter((group) => group.badges.length > 0),
  );

  protected readonly isFull = computed(() => this.selected().length >= FEATURED_BADGES_MAX);
  protected readonly saving = signal(false);
  protected readonly error = signal(false);

  constructor() {
    afterNextRender(() => this.dialog().nativeElement.showModal());
  }

  protected add(badge: UnlockedBadgeDto): void {
    if (this.isFull()) {
      return;
    }
    this.selected.update((list) => [...list, badge]);
  }

  protected remove(badge: UnlockedBadgeDto): void {
    this.selected.update((list) => list.filter((item) => item.badgeId !== badge.badgeId));
  }

  protected save(): void {
    this.saving.set(true);
    this.error.set(false);
    this.profileService
      .setFeaturedBadges(this.selected().map((badge) => badge.badgeId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.saving.set(false);
          this.saved.emit(list);
          this.dialog().nativeElement.close();
        },
        error: () => {
          this.saving.set(false);
          this.error.set(true);
        },
      });
  }

  protected close(): void {
    if (this.saving()) {
      return;
    }
    this.dialog().nativeElement.close();
  }

  // Esc fires cancel before close: blocked while saving.
  protected onCancel(event: Event): void {
    if (this.saving()) {
      event.preventDefault();
    }
  }

  protected onClose(): void {
    this.closed.emit();
  }

  // "Category · level", e.g. "Attività · II"
  protected badgeMeta(badge: UnlockedBadgeDto): string {
    return `${MISSION_CATEGORY_META[badge.category].label} · ${toRoman(badge.sequenceOrder)}`;
  }
}
