import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DistrictSelect } from '../../../districts/components/district-select/district-select';

export interface ReportFormValue {
  category: string;
  districtId: number;
  title: string;
  description: string;
  storyContent: string;
}

const NOT_BLANK = /\S/;

const contentRequired: ValidatorFn = (group) => {
  const description = group.get('description')?.value ?? '';
  const storyContent = group.get('storyContent')?.value ?? '';
  return NOT_BLANK.test(description) || NOT_BLANK.test(storyContent)
    ? null
    : { contentRequired: true };
};

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule, DistrictSelect],
  templateUrl: './report-form.html',
  styleUrl: './report-form.scss',
})
export class ReportForm {
  private fb = inject(NonNullableFormBuilder);

  readonly sending = input(false);
  readonly highlightSubmit = input(false);
  readonly publish = output<ReportFormValue>();
  private injector = inject(Injector);
  private readonly submitButton = viewChild<ElementRef<HTMLButtonElement>>('submitButton');

  protected readonly limits = { title: 120, description: 240, storyContent: 3000 };
  protected readonly attempted = signal(false);

  protected readonly categories = [
    { value: 'decoro', label: 'Decoro' },
    { value: 'sicurezza', label: 'Sicurezza' },
    { value: 'trasporti', label: 'Trasporti' },
    { value: 'servizi', label: 'Servizi' },
  ];

  protected readonly form = this.fb.group(
    {
      category: ['', Validators.required],
      districtId: this.fb.control<number | null>(null, Validators.required),
      title: [
        '',
        [
          Validators.required,
          Validators.pattern(NOT_BLANK),
          Validators.maxLength(this.limits.title),
        ],
      ],
      description: ['', Validators.maxLength(this.limits.description)],
      storyContent: ['', Validators.maxLength(this.limits.storyContent)],
    },
    { validators: contentRequired },
  );

  constructor() {
    effect(() => {
      if (this.highlightSubmit()) {
        afterNextRender(
          () =>
            this.submitButton()?.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            }),
          { injector: this.injector },
        );
      }
    });
  }

  protected hasError(field: keyof ReportFormValue): boolean {
    return this.attempted() && this.form.controls[field].invalid;
  }

  protected hasContentError(): boolean {
    return this.attempted() && this.form.hasError('contentRequired');
  }

  protected submit(): void {
    this.attempted.set(true);
    const { category, districtId, title, description, storyContent } = this.form.getRawValue();
    if (this.form.invalid || districtId === null) {
      return;
    }
    this.publish.emit({ category, districtId, title, description, storyContent });
  }
}
