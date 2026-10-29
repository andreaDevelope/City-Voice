import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, Subscription, distinctUntilChanged, map, of, switchMap, timer } from 'rxjs';
import { StoryCard } from '../../components/story-card/story-card';
import { DesktopButtonDrawer } from '../../../../shared/ui/desktop-buttons/desktop-button-drawer';
import { StoryService } from '../../services/story.service';
import { CategoryCount, StoryCardItem } from '../../models/story-feed';
import { ReportCategory } from '../../enums/report-category';
import {
  ALL_CATEGORIES_ICON_PATHS,
  REPORT_CATEGORY_META,
} from '../../constants/report-category-meta';

const PAGE_SIZE = 10;
const SEARCH_MIN_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 300;

// Typing searches after the debounce and only from SEARCH_MIN_LENGTH; Enter searches immediately.
interface SearchInput {
  value: string;
  immediate: boolean;
}

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
  protected readonly categoryMeta = REPORT_CATEGORY_META;
  protected readonly allCategoriesIcon = ALL_CATEGORIES_ICON_PATHS;
  protected readonly query = signal('');
  protected readonly selectedCategory = signal<ReportCategory | null>(null);
  protected readonly searchPlaceholder = computed(() => {
    const category = this.selectedCategory();
    return category
      ? `Cerca in ${this.categoryMeta[category].label}…`
      : 'Cerca in tutto: titolo, autore, quartiere o municipio…';
  });
  protected readonly hasNext = signal(false);
  protected readonly loading = signal(false);
  protected readonly loadError = signal(false);

  private readonly search$ = new Subject<SearchInput>();
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private feedRequest: Subscription | null = null;
  private currentPage = 0;
  private requestedPage = 0;

  constructor() {
    this.search$
      .pipe(
        switchMap(({ value, immediate }) =>
          immediate
            ? of(value)
            : timer(SEARCH_DEBOUNCE_MS).pipe(
                map(() => (value.length < SEARCH_MIN_LENGTH ? '' : value)),
              ),
        ),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
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
        error: () => this.categories.set([]),
      });
    this.reload();
  }

  protected onSearch(event: Event): void {
    this.search$.next({ value: (event.target as HTMLInputElement).value.trim(), immediate: false });
  }

  protected onSearchSubmit(event: Event): void {
    this.submitSearch((event.target as HTMLInputElement).value);
  }

  // Enter and the magnifier button search immediately, even under SEARCH_MIN_LENGTH.
  protected submitSearch(value: string): void {
    this.search$.next({ value: value.trim(), immediate: true });
  }

  protected clearSearch(): void {
    const input = this.searchInput()?.nativeElement;
    if (input) {
      input.value = '';
    }
    this.search$.next({ value: '', immediate: true });
  }

  // porta il chip toccato al centro della riga orizzontale (mobile); su desktop non sposta nulla se è già visibile
  protected centerChip(event: Event): void {
    (event.currentTarget as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  protected selectCategory(category: ReportCategory | null): void {
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
