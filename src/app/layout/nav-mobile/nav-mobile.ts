import {
  Component,
  signal,
  computed,
  inject,
  HostListener,
  ElementRef,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthPromptService } from '../../core/auth/auth-prompt.service';

type NavIcon = 'home' | 'storie' | 'racconta' | 'profilo' | 'setting' | 'accedi';

interface NavItem {
  label: string;
  icon: NavIcon;
  path?: string;
  action?: 'login';
}

@Component({
  standalone: true,
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.html',
  styleUrls: ['./nav-mobile.scss'],
  imports: [],
})
export class NavMobile {
  private router = inject(Router);
  private authService = inject(AuthService);
  private authPrompt = inject(AuthPromptService);
  private socialClock = viewChild.required<ElementRef<HTMLElement>>('socialClock');

  // Limiti di offset ammessi, calcolati una volta a inizio drag.
  // Sono offset (stesso sistema di dragX/dragY), non coordinate schermo.
  private minOffsetX = 0;
  private maxOffsetX = 0;
  private minOffsetY = 0;
  private maxOffsetY = 0;

  private readonly commonItems: NavItem[] = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Storie', icon: 'storie', path: '/storie' },
    { label: 'Racconta', icon: 'racconta', path: '/racconta' },
  ];

  items = computed<NavItem[]>(() =>
    this.authService.isLoggedIn()
      ? [
          ...this.commonItems,
          { label: 'Profilo', icon: 'profilo', path: '/profilo' },
          { label: 'Impostazioni', icon: 'setting', path: '/setting' },
        ]
      : [...this.commonItems, { label: 'Accedi', icon: 'accedi', action: 'login' }],
  );

  open = signal(false);

  dragX = signal(0);
  dragY = signal(0);

  private isDragging = false;
  private hasMoved = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartOffsetX = 0;
  private dragStartOffsetY = 0;
  private readonly DRAG_THRESHOLD = 5;
  private readonly DRAG_SPEED = 1.3;
  private readonly MIN_VISIBLE_RATIO = 0.55;

  toggleMenu() {
    if (this.hasMoved) return;
    this.open.set(!this.open());
  }

  select(item: NavItem) {
    if (this.hasMoved) return;
    this.open.set(false);

    if (item.action === 'login') {
      this.authPrompt.openLogin();
      return;
    }

    if (item.path) {
      this.router.navigate([item.path]);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.startDrag(event.clientX, event.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.updateDragPosition(event.clientX, event.clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onTouchStart(event: TouchEvent) {
    this.startDrag(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    this.updateDragPosition(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.isDragging = false;
  }

  private startDrag(x: number, y: number) {
    this.isDragging = true;
    this.hasMoved = false;
    this.dragStartX = x;
    this.dragStartY = y;
    this.dragStartOffsetX = this.dragX();
    this.dragStartOffsetY = this.dragY();
    this.computeOffsetBounds();
  }

  // Deriva i limiti di dragX/dragY partendo dalla posizione a riposo
  // dell'elemento, cioè il rect attuale meno l'offset già applicato.
  private computeOffsetBounds() {
    const rect = this.socialClock().nativeElement.getBoundingClientRect();

    // Posizione dell'elemento come se dragX/dragY fossero 0.
    const restLeft = rect.left - this.dragX();
    const restTop = rect.top - this.dragY();

    const minVisibleX = rect.width * this.MIN_VISIBLE_RATIO;
    const minVisibleY = rect.height * this.MIN_VISIBLE_RATIO;

    // L'elemento può spostarsi finché almeno MIN_VISIBLE_RATIO resta in viewport.
    this.minOffsetX = minVisibleX - rect.width - restLeft;
    this.maxOffsetX = window.innerWidth - minVisibleX - restLeft;
    this.minOffsetY = minVisibleY - rect.height - restTop;
    this.maxOffsetY = window.innerHeight - minVisibleY - restTop;
    console.log({
      rect: { left: rect.left, top: rect.top, w: rect.width, h: rect.height },
      rest: { restLeft, restTop },
      bounds: {
        minX: this.minOffsetX,
        maxX: this.maxOffsetX,
        minY: this.minOffsetY,
        maxY: this.maxOffsetY,
      },
      viewport: { w: window.innerWidth, h: window.innerHeight },
    });
  }

  private updateDragPosition(x: number, y: number) {
    const deltaX = x - this.dragStartX;
    const deltaY = y - this.dragStartY;

    if (Math.abs(deltaX) > this.DRAG_THRESHOLD || Math.abs(deltaY) > this.DRAG_THRESHOLD) {
      this.hasMoved = true;
    }

    const proposedX = this.dragStartOffsetX + deltaX * this.DRAG_SPEED;
    const proposedY = this.dragStartOffsetY + deltaY * this.DRAG_SPEED;

    this.dragX.set(Math.min(Math.max(proposedX, this.minOffsetX), this.maxOffsetX));
    this.dragY.set(Math.min(Math.max(proposedY, this.minOffsetY), this.maxOffsetY));
  }

  getNavStyle() {
    return {
      transform: `translate(${this.dragX()}px, ${this.dragY()}px)`,
      '--count-buttons': this.items().length,
    };
  }
}
