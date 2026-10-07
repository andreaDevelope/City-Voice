import { Component, computed, input } from '@angular/core';

const MAX_DOTS = 3;

@Component({
  selector: 'app-progress-dots',
  templateUrl: './progress-dots.html',
  styleUrl: './progress-dots.scss',
})
export class ProgressDots {
  readonly counter = input.required<number>();
  readonly threshold = input.required<number>();

  protected readonly total = computed(() => Math.min(this.threshold(), MAX_DOTS));

  protected readonly lit = computed(() => {
    const threshold = this.threshold();
    if (threshold <= 0) {
      return 0;
    }
    return Math.min(this.total(), Math.floor((this.counter() * this.total()) / threshold));
  });

  protected readonly indexes = computed(() => Array.from({ length: this.total() }, (_, i) => i));
}
