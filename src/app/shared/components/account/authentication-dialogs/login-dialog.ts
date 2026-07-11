import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss'],
})
export class LoginDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();

  close(): void {
    this.closeDialog.emit();
  }
}
