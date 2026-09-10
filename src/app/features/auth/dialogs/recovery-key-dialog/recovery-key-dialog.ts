import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-recovery-key-dialog',
  standalone: true,
  imports: [],
  templateUrl: './recovery-key-dialog.html',
  styleUrls: ['./recovery-key-dialog.scss'],
})
export class RecoveryKeyDialogComponent {
  @Input({ required: true }) recoveryKey = '';
  @Output() confirmed = new EventEmitter<void>();

  saved = signal(false);
  copied = signal(false);

  toggleSaved() {
    this.saved.set(!this.saved());
  }

  async copyKey() {
    try {
      await navigator.clipboard.writeText(this.recoveryKey);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }

  confirm() {
    if (!this.saved()) return;
    this.confirmed.emit();
  }
}
