import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-desktop-button-drawer',
  imports: [CommonModule, RouterModule],
  templateUrl: './desktop-button-drawer.html',
  styleUrl: './desktop-button-drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopButtonDrawer {
  @Input({ required: true }) label!: string;
  @Input() microTop?: string;
  @Input() microBottom?: string;
  @Input() routerLink?: string | string[];
  @Output() action = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent) {
    if (this.routerLink) return;
    this.action.emit(e);
  }
}
