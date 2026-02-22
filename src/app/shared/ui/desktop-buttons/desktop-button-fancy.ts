import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-desktop-button-fancy',
  imports: [CommonModule, RouterModule],
  templateUrl: './desktop-button-fancy.html',
  styleUrl: './desktop-button-fancy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopButtonFancy {
  @Input({ required: true }) label!: string;
  @Input() routerLink?: string | string[];
  @Output() action = new EventEmitter<MouseEvent>();
  onClick(e: MouseEvent) {
    if (this.routerLink) return;
    this.action.emit(e);
  }
}
