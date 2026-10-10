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
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NOT_BLANK, contentRequired } from '../../validators/content-required.validator';

export interface StoryFormValue {
  title: string;
  description: string;
  storyContent: string;
}

@Component({
  selector: 'app-story-form',
  imports: [ReactiveFormsModule],
  templateUrl: './story-form.html',
  styleUrl: './story-form.scss',
})
export class StoryForm {
  private fb = inject(NonNullableFormBuilder);

  readonly sending = input(false);
  readonly highlightSubmit = input(false);
  readonly publish = output<StoryFormValue>();
  private injector = inject(Injector);
  private readonly submitButton = viewChild<ElementRef<HTMLButtonElement>>('submitButton');

  protected readonly limits = { title: 120, description: 240, storyContent: 15000 };
  protected readonly attempted = signal(false);

  protected readonly form = this.fb.group(
    {
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

  protected hasError(field: keyof StoryFormValue): boolean {
    return this.attempted() && this.form.controls[field].invalid;
  }

  protected hasContentError(): boolean {
    return this.attempted() && this.form.hasError('contentRequired');
  }

  protected submit(): void {
    this.attempted.set(true);
    if (this.form.invalid) {
      return;
    }
    this.publish.emit(this.form.getRawValue());
  }
}
