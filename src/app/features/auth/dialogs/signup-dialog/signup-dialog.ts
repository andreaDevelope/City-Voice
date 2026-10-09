import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { User } from '../../../../core/auth/models/user.model';
import { LoginRequest } from '../../../../core/auth/models/login-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { httpErrorMessage } from '../../../../shared/utils/http-error-message';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-dialog.html',
  styleUrls: ['./signup-dialog.scss'],
})
export class SignupDialogComponent {
  @Output() closeSignupDialog = new EventEmitter<void>();
  @Output() registered = new EventEmitter<string>();
  @Output() switchToLogin = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  constructor() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
    });
  }

  signup() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const signupData: User = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.register(signupData).subscribe({
      next: (response) => {
        const credentials: LoginRequest = {
          username: this.form.value.username,
          password: this.form.value.password,
        };
        this.authService.signIn(credentials).subscribe({
          next: () => {
            this.loading = false;
            this.registered.emit(response.recoveryKey);
          },
          error: () => {
            this.loading = false;
            this.registered.emit(response.recoveryKey);
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = httpErrorMessage(err, 'Errore nella registrazione');
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  goToLogin(): void {
    this.switchToLogin.emit();
  }

  close(): void {
    this.closeSignupDialog.emit();
  }
}
