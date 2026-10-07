import { Component, effect, inject, signal, untracked } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthPromptService } from '../../../../core/auth/auth-prompt.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { UserProfileDto } from '../../../profile/models/user-profile.dto';
import { StoryService } from '../../services/story.service';
import { StoryType } from '../../models/story-type';
import { CreateStoryRequest, StoryResponse } from '../../models/story-submission';
import { ChoiceCards } from '../../components/choice-cards/choice-cards';
import { AuthorChip } from '../../components/author-chip/author-chip';
import { StoryForm, StoryFormValue } from '../../components/story-form/story-form';
import { ReportForm, ReportFormValue } from '../../components/report-form/report-form';

type Step = 'choice' | StoryType | 'success';

@Component({
  selector: 'app-story-create-page',
  imports: [ChoiceCards, AuthorChip, StoryForm, ReportForm],
  templateUrl: './story-create-page.html',
  styleUrl: './story-create-page.scss',
})
export class StoryCreatePage {
  private auth = inject(AuthService);
  private authPrompt = inject(AuthPromptService);
  private profileService = inject(ProfileService);
  private storyService = inject(StoryService);

  protected readonly step = signal<Step>('choice');
  protected readonly sending = signal(false);
  protected readonly submitError = signal(false);
  protected readonly profile = signal<UserProfileDto | null>(null);
  protected readonly result = signal<StoryResponse | null>(null);

  constructor() {
    effect(() => {
      if (this.auth.isLoggedIn()) {
        untracked(() => this.loadProfile());
      } else {
        this.profile.set(null);
      }
    });
  }

  protected choose(type: StoryType): void {
    this.submitError.set(false);
    this.step.set(type);
  }

  protected backToChoice(): void {
    this.submitError.set(false);
    this.result.set(null);
    this.step.set('choice');
  }

  protected publishStory(value: StoryFormValue): void {
    this.send({ type: 'STORY', category: null, districtId: null, ...value });
  }

  protected publishReport(value: ReportFormValue): void {
    this.send({ type: 'REPORT', ...value });
  }

  private send(request: CreateStoryRequest): void {
    if (!this.auth.isLoggedIn()) {
      this.authPrompt.openSignup();
      return;
    }
    this.sending.set(true);
    this.submitError.set(false);
    this.storyService.create(request).subscribe({
      next: (response) => {
        this.result.set(response);
        this.sending.set(false);
        this.step.set('success');
      },
      error: () => {
        this.sending.set(false);
        this.submitError.set(true);
      },
    });
  }

  private loadProfile(): void {
    this.profileService.getMyProfile().subscribe({
      next: (data) => this.profile.set(data),
    });
  }
}
