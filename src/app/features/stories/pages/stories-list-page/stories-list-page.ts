import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { StoryCard } from '../../components/story-card/story-card';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';
import { StoryService } from '../../services/story.service';
import { CategoryCount, StoryCardItem } from '../../models/story-feed';

const PAGE_SIZE = 10;

@Component({
  standalone: true,
  selector: 'app-stories-list',
  imports: [StoryCard, RouterLink, DesktopButtonDrawer],
  templateUrl: './stories-list-page.html',
  styleUrl: './stories-list-page.scss',
})
export class StoriesList implements OnInit {
  private storyService = inject(StoryService);
  private destroyRef = inject(DestroyRef);

  addStory = 'RACCONTA LA TUA STORIA';
  microTop = 'ANONIMO GARANTITO';
  microBotton = 'NO INFO PERSONALI';
  manifestoIsShowMore = false;
  manifestoIsShowMoreDsk = false;

  protected readonly items = signal<StoryCardItem[]>([]);
  protected readonly categories = signal<CategoryCount[]>([]);
  protected readonly query = signal('');
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly hasNext = signal(false);
  protected readonly loading = signal(false);
  protected readonly loadError = signal(false);

  private readonly search$ = new Subject<string>();
  private feedRequest: Subscription | null = null;
  private currentPage = 0;
  private requestedPage = 0;

  constructor() {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.query.set(value);
        this.reload();
      });
  }

  ngOnInit(): void {
    this.storyService
      .getCategoryCounts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (counts) => this.categories.set(counts),
      });
    this.reload();
  }

  protected onSearch(event: Event): void {
    this.search$.next((event.target as HTMLInputElement).value.trim());
  }

  protected selectCategory(category: string | null): void {
    if (this.selectedCategory() === category) {
      return;
    }
    this.selectedCategory.set(category);
    this.reload();
  }

  protected reload(): void {
    this.items.set([]);
    this.hasNext.set(false);
    this.currentPage = 0;
    this.load(0);
  }

  protected loadMore(): void {
    if (this.loading() || !this.hasNext()) {
      return;
    }
    this.load(this.currentPage + 1);
  }

  protected retry(): void {
    this.load(this.requestedPage);
  }

  private load(page: number): void {
    this.feedRequest?.unsubscribe();
    this.requestedPage = page;
    this.loading.set(true);
    this.loadError.set(false);
    this.feedRequest = this.storyService
      .getFeed({
        q: this.query(),
        category: this.selectedCategory() ?? undefined,
        page,
        size: PAGE_SIZE,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.items.update((current) =>
            page === 0 ? response.items : [...current, ...response.items],
          );
          this.hasNext.set(response.hasNext);
          this.currentPage = response.page;
          this.loading.set(false);
        },
        error: () => {
          this.loadError.set(true);
          this.loading.set(false);
        },
      });
  }

  manifestoShowMoreToggle() {
    this.manifestoIsShowMore = !this.manifestoIsShowMore;
  }

  manifestoShowMoreToggleDsk() {
    this.manifestoIsShowMoreDsk = !this.manifestoIsShowMoreDsk;
  }
}
