import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.html',
  styleUrls: ['./nav-mobile.scss'],
  imports: [CommonModule],
})
export class NavMobile {
  // Posizione trascinata (px)
  dragX = signal(0);
  dragY = signal(0);

  private isDragging = false;
  private hasMoved = false; // Flag per ignorare click se mosso
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartOffsetX = 0;
  private dragStartOffsetY = 0;
  private readonly DRAG_THRESHOLD = 5; // px
  private readonly DRAG_SPEED = 1.3; // velocità moltiplicatore

  // Mouse drag
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

  // Touch drag
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

    // Detecta movimento oltre il threshold
    if (Math.abs(deltaX) > this.DRAG_THRESHOLD || Math.abs(deltaY) > this.DRAG_THRESHOLD) {
      this.hasMoved = true;
    }

    // Applica velocità moltiplicata
    const scaledDeltaX = deltaX * this.DRAG_SPEED;
    const scaledDeltaY = deltaY * this.DRAG_SPEED;

    this.dragX.set(this.dragStartOffsetX + scaledDeltaX);
    this.dragY.set(this.dragStartOffsetY + scaledDeltaY);
  }

  toggleMenuSafe() {
    // Ignora toggle se il touch si è mosso durante il drag
    if (this.hasMoved) {
      return;
    }
    // TODO: implementare toggle menù (per ora non esiste)
  }

  getNavStyle() {
    return {
      transform: `translate(${this.dragX()}px, ${this.dragY()}px)`,
    };
  }
}
