import { Component, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface StoryFormValue {
  title: string;
  description: string;
  storyContent: string;
}

const NOT_BLANK = /\S/;

@Component({
  selector: 'app-story-form',
  imports: [ReactiveFormsModule],
  templateUrl: './story-form.html',
  styleUrl: './story-form.scss',
})
export class StoryForm {
  private fb = inject(NonNullableFormBuilder);

  readonly sending = input(false);
  readonly publish = output<StoryFormValue>();

  protected readonly limits = { title: 120, description: 240, storyContent: 15000 };
  protected readonly attempted = signal(false);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(NOT_BLANK), Validators.maxLength(this.limits.title)]],
    description: ['', [Validators.required, Validators.pattern(NOT_BLANK), Validators.maxLength(this.limits.description)]],
    storyContent: ['', [Validators.required, Validators.pattern(NOT_BLANK), Validators.maxLength(this.limits.storyContent)]],
  });

  protected hasError(field: keyof StoryFormValue): boolean {
    return this.attempted() && this.form.controls[field].invalid;
  }

  protected submit(): void {
    this.attempted.set(true);
    if (this.form.invalid) {
      return;
    }
    this.publish.emit(this.form.getRawValue());
  }
}
