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
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BadgeMedallion } from '../../../../shared/ui/badge-medallion/badge-medallion';
import { toRoman } from '../../../../shared/utils/to-roman';
import { FEATURED_BADGES_MAX } from '../../constants/featured-badges';
import { MISSION_CATEGORY_META } from '../../constants/mission-category-meta';
import { MissionCategory } from '../../enums/mission-category';
import { UnlockedBadgeDto } from '../../models/unlocked-badge.dto';
import { ProfileService } from '../../services/profile.service';

// Touch needs a short press before dragging, so a quick swipe still scrolls the carousel.
const DRAG_START_DELAY = { touch: 250, mouse: 0 };

// Comet trail: a tapered neon ribbon through the recent pointer positions, plus sparks.
const TRAIL_LIFE_MS = 420;
const TRAIL_WIDTH = 9;
const SPARK_LIFE_MS = 750;
const SPARK_MAX = 60;

// Ribbon passes, drawn additively from wide and faint to thin and hot.
// A null colour means the category colour.
const TRAIL_PASSES: { width: number; alpha: number; color: string | null }[] = [
  { width: 3.4, alpha: 0.1, color: null },
  { width: 1.7, alpha: 0.32, color: null },
  { width: 0.45, alpha: 0.85, color: '#ffffff' },
];

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
  life: number;
  size: number;
}

// Draws the trail on a canvas laid over the dialog. Runs on requestAnimationFrame only
// while something is visible, and never touches Angular state.
class DragTrail {
  private ctx: CanvasRenderingContext2D | null = null;
  private points: TrailPoint[] = [];
  private sparks: Spark[] = [];
  private color = '#ffffff';
  private originX = 0;
  private originY = 0;
  private frame = 0;
  private active = false;

  constructor(private readonly canvas: HTMLCanvasElement) {}

  start(area: DOMRect, color: string): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(area.width * dpr);
    this.canvas.height = Math.round(area.height * dpr);
    this.ctx = this.canvas.getContext('2d');
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.originX = area.left;
    this.originY = area.top;
    this.color = color;
    this.points = [];
    this.sparks = [];
    this.active = true;
  }

  // Pointer position is viewport-relative, like the rect passed to start().
  move(clientX: number, clientY: number): void {
    if (!this.active) {
      return;
    }
    const time = performance.now();
    const x = clientX - this.originX;
    const y = clientY - this.originY;
    const last = this.points.at(-1);
    this.points.push({ x, y, time });

    // Sparks drift backwards along the movement, with some jitter.
    if (last && this.sparks.length < SPARK_MAX) {
      this.sparks.push({
        x,
        y,
        vx: (last.x - x) * 0.004 + (Math.random() - 0.5) * 0.06,
        vy: (last.y - y) * 0.004 + (Math.random() - 0.5) * 0.06,
        time,
        life: SPARK_LIFE_MS * (0.6 + Math.random() * 0.4),
        size: 0.8 + Math.random() * 1.6,
      });
    }
    this.requestFrame();
  }

  // What is already drawn fades out on its own.
  stop(): void {
    this.active = false;
  }

  destroy(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.points = [];
    this.sparks = [];
  }

  private requestFrame(): void {
    if (!this.frame) {
      this.frame = requestAnimationFrame(this.draw);
    }
  }

  private readonly draw = (now: number): void => {
    this.frame = 0;
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    this.points = this.points.filter((point) => now - point.time < TRAIL_LIFE_MS);
    this.sparks = this.sparks.filter((spark) => now - spark.time < spark.life);

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Each segment narrows and fades with the age of its newer end: the comet tapers.
    for (const pass of TRAIL_PASSES) {
      ctx.strokeStyle = pass.color ?? this.color;
      for (let i = 1; i < this.points.length; i++) {
        const from = this.points[i - 1];
        const to = this.points[i];
        const life = 1 - (now - to.time) / TRAIL_LIFE_MS;
        ctx.globalAlpha = pass.alpha * life;
        ctx.lineWidth = TRAIL_WIDTH * pass.width * life * life;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = this.color;
    for (const spark of this.sparks) {
      const age = now - spark.time;
      const life = 1 - age / spark.life;
      const x = spark.x + spark.vx * age;
      const y = spark.y + spark.vy * age;
      ctx.globalAlpha = 0.25 * life;
      ctx.beginPath();
      ctx.arc(x, y, spark.size * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = life;
      ctx.beginPath();
      ctx.arc(x, y, spark.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (this.active || this.points.length > 0 || this.sparks.length > 0) {
      this.requestFrame();
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };
}

@Component({
  selector: 'app-featured-badges-dialog',
  imports: [BadgeMedallion, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './featured-badges-dialog.html',
  styleUrl: './featured-badges-dialog.scss',
})
export class FeaturedBadgesDialog {
  private readonly profileService = inject(ProfileService);
  private readonly destroyRef = inject(DestroyRef);

  readonly badges = input.required<UnlockedBadgeDto[]>();
  // Badge to pulse and scroll into view on open (from the badge-unlocked dialog).
  readonly highlightBadgeId = input<number | null>(null);
  readonly saved = output<UnlockedBadgeDto[]>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly trailCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('trailCanvas');
  private trail: DragTrail | null = null;

  protected readonly maxBadges = FEATURED_BADGES_MAX;
  protected readonly dragStartDelay = DRAG_START_DELAY;

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
    afterNextRender(() => {
      const dialog = this.dialog().nativeElement;
      dialog.showModal();
      if (this.highlightBadgeId() !== null) {
        dialog
          .querySelector('.is-highlighted')
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    this.destroyRef.onDestroy(() => this.trail?.destroy());
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

  // Reorder within the slots, or place a badge dragged from the carousel.
  protected onSlotsDropped(event: CdkDragDrop<unknown>): void {
    if (event.previousContainer === event.container) {
      const list = [...this.selected()];
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      this.selected.set(list);
      return;
    }
    const badge = event.item.data as UnlockedBadgeDto;
    if (this.isFull()) {
      return;
    }
    const index = Math.min(event.currentIndex, this.selected().length);
    this.selected.update((list) => [...list.slice(0, index), badge, ...list.slice(index)]);
  }

  // A slot dropped on the carousel leaves the featured badges. The carousel never reorders.
  protected onCarouselDropped(event: CdkDragDrop<unknown>): void {
    if (event.previousContainer !== event.container) {
      this.remove(event.item.data as UnlockedBadgeDto);
    }
  }

  // The trail takes the category colour resolved on the dragged element ([data-category]).
  protected onDragStarted(event: CdkDragStart): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const color = getComputedStyle(event.source.element.nativeElement)
      .getPropertyValue('--category-color')
      .trim();
    this.trail ??= new DragTrail(this.trailCanvas().nativeElement);
    this.trail.start(this.dialog().nativeElement.getBoundingClientRect(), color || '#ffffff');
  }

  protected onDragMoved(event: CdkDragMove): void {
    this.trail?.move(event.pointerPosition.x, event.pointerPosition.y);
  }

  protected onDragEnded(): void {
    this.trail?.stop();
  }

  // Arrow function to keep `this`: the CDK calls the predicate unbound.
  protected readonly canEnterSlots = (drag: CdkDrag, drop: CdkDropList): boolean =>
    drag.dropContainer === drop || !this.isFull();

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

  protected isHighlighted(badge: UnlockedBadgeDto): boolean {
    return badge.badgeId === this.highlightBadgeId();
  }

  // "Category · level", e.g. "Attività · II"
  protected badgeMeta(badge: UnlockedBadgeDto): string {
    return `${MISSION_CATEGORY_META[badge.category].label} · ${toRoman(badge.sequenceOrder)}`;
  }
}
