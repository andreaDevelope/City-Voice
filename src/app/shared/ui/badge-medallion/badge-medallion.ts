import { Component, computed, input } from '@angular/core';
import { MissionCategory } from '../../../features/profile/enums/mission-category';
import { MISSION_CATEGORY_META } from '../../../features/profile/constants/mission-category-meta';
import { toRoman } from '../../utils/to-roman';

@Component({
  selector: 'app-badge-medallion',
  templateUrl: './badge-medallion.html',
  styleUrl: './badge-medallion.scss',
})
export class BadgeMedallion {
  readonly category = input.required<MissionCategory>();
  // Badge sequenceOrder, shown as a Roman numeral
  readonly level = input.required<number>();

  protected readonly meta = computed(() => MISSION_CATEGORY_META[this.category()]);
  protected readonly romanLevel = computed(() => toRoman(this.level()));
}
