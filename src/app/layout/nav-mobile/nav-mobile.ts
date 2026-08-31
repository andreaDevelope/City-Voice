import { Component, signal, computed, inject, HostListener } from '@angular/core';
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
  }

  private updateDragPosition(x: number, y: number) {
    const deltaX = x - this.dragStartX;
    const deltaY = y - this.dragStartY;

    if (Math.abs(deltaX) > this.DRAG_THRESHOLD || Math.abs(deltaY) > this.DRAG_THRESHOLD) {
      this.hasMoved = true;
    }

    this.dragX.set(this.dragStartOffsetX + deltaX * this.DRAG_SPEED);
    this.dragY.set(this.dragStartOffsetY + deltaY * this.DRAG_SPEED);
  }

  getNavStyle() {
    return {
      transform: `translate(${this.dragX()}px, ${this.dragY()}px)`,
      '--count-buttons': this.items().length,
    };
  }
}
