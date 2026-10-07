import { Component, computed, input, output, signal } from '@angular/core';
import { ProgressDots } from '../../../../shared/ui/progress-dots/progress-dots';
import { StoryResponse } from '../../models/story-submission';
import { CategoryProgress } from '../../../profile/models/category-progress.model';

@Component({
  selector: 'app-success-panel',
  imports: [ProgressDots],
  templateUrl: './success-panel.html',
  styleUrl: './success-panel.scss',
})
export class SuccessPanel {
  readonly story = input.required<StoryResponse>();
  readonly previous = input<CategoryProgress[] | null>(null);
  readonly again = output<void>();

  protected readonly showStory = signal(false);

  protected readonly heading = computed(() =>
    this.story().type === 'REPORT'
      ? 'Il problema non è più invisibile.'
      : 'La tua storia ora è di tutti.',
  );

  protected readonly activity = computed(() => this.find(this.story().badgeProgress, 'activity'));
  protected readonly neighborhood = computed(() =>
    this.find(this.story().badgeProgress, 'neighborhood'),
  );

  protected readonly newMunicipio = computed(() => {
    const before = this.find(this.previous() ?? [], 'neighborhood')?.counter;
    const after = this.neighborhood()?.counter;
    return before !== undefined && after !== undefined && after > before;
  });

  private find(list: CategoryProgress[], key: string): CategoryProgress | undefined {
    return list.find((p) => p.category === key);
  }
}
