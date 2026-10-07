import { Component, computed, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DistrictService } from '../../services/district.service';
import { District, MunicipioGroup } from '../../models/district.model';

let nextId = 0;

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

@Component({
  selector: 'app-district-select',
  templateUrl: './district-select.html',
  styleUrl: './district-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistrictSelect),
      multi: true,
    },
  ],
})
export class DistrictSelect implements ControlValueAccessor {
  private districtService = inject(DistrictService);

  readonly invalid = input(false);

  protected readonly baseId = `district-select-${nextId++}`;
  protected readonly listId = `${this.baseId}-list`;

  protected readonly groups = signal<MunicipioGroup[]>([]);
  protected readonly loadError = signal(false);
  protected readonly open = signal(false);
  protected readonly disabled = signal(false);
  protected readonly activeIndex = signal(-1);

  private readonly selectedId = signal<number | null>(null);
  private readonly query = signal<string | null>(null);

  private onChange?: (value: number | null) => void;
  private onTouched?: () => void;

  private readonly selectedName = computed(() => {
    const id = this.selectedId();
    if (id === null) {
      return '';
    }
    for (const group of this.groups()) {
      const match = group.districts.find((d) => d.id === id);
      if (match) {
        return match.name;
      }
    }
    return '';
  });

  protected readonly displayValue = computed(() => this.query() ?? this.selectedName());

  protected readonly filteredGroups = computed(() => {
    const term = normalize(this.query() ?? '');
    if (!term) {
      return this.groups();
    }
    return this.groups()
      .map((group) => ({
        ...group,
        districts: group.districts.filter((d) => normalize(d.name).includes(term)),
      }))
      .filter((group) => group.districts.length > 0);
  });

  protected readonly options = computed(() => this.filteredGroups().flatMap((g) => g.districts));

  protected readonly activeOptionId = computed(() => {
    const option = this.options()[this.activeIndex()];
    return option ? this.optionId(option) : null;
  });

  constructor() {
    this.districtService.getGroupedByMunicipio().subscribe({
      next: (groups) => this.groups.set(groups),
      error: () => this.loadError.set(true),
    });
  }

  protected optionId(district: District): string {
    return `${this.baseId}-option-${district.id}`;
  }

  protected isSelected(district: District): boolean {
    return this.selectedId() === district.id;
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.query.set(text);
    this.open.set(true);
    this.activeIndex.set(this.options().length > 0 ? 0 : -1);
    if (this.selectedId() !== null) {
      this.setSelection(null);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const count = this.options().length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.open.set(true);
        if (count > 0) {
          this.activeIndex.update((i) => (i + 1) % count);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.open.set(true);
        if (count > 0) {
          this.activeIndex.update((i) => (i <= 0 ? count - 1 : i - 1));
        }
        break;
      case 'Enter': {
        const option = this.options()[this.activeIndex()];
        if (this.open() && option) {
          event.preventDefault();
          this.choose(option);
        }
        break;
      }
      case 'Escape':
        if (this.open()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  protected toggle(input: HTMLInputElement): void {
    if (this.open()) {
      this.close();
    } else {
      this.open.set(true);
      input.focus();
    }
  }

  protected choose(district: District): void {
    this.setSelection(district.id);
    this.close();
  }

  protected onBlur(): void {
    this.close();
    this.onTouched?.();
  }

  private close(): void {
    this.open.set(false);
    this.query.set(null);
    this.activeIndex.set(-1);
  }

  private setSelection(id: number | null): void {
    this.selectedId.set(id);
    this.onChange?.(id);
  }

  writeValue(value: number | null): void {
    this.selectedId.set(value ?? null);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
