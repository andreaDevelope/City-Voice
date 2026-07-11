/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { iLoginRequest } from '../../../../core/auth/models/iLoginRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss'],
})
export class LoginDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const loginData: iLoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.saveAuth(response);
        this.loading = false;
        this.close();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore nel login';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  close(): void {
    this.closeDialog.emit();
  }
}
