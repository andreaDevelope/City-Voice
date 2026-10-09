import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthPromptService } from '../../../../core/auth/auth-prompt.service';
import { LoginRequest } from '../../../../core/auth/models/login-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { httpErrorMessage } from '../../../../shared/utils/http-error-message';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss'],
})
export class LoginDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  form: FormGroup;
  recoveryForm: FormGroup;
  recoveryMode = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  private fb: FormBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  private router = inject(Router);
  private authPrompt = inject(AuthPromptService);
  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.recoveryForm = this.fb.group({
      username: ['', Validators.required],
      recoveryKey: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleRecoveryMode() {
    this.recoveryMode = !this.recoveryMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  recover() {
    if (this.recoveryForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.recoverAccount(this.recoveryForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Password aggiornata. Ora puoi accedere.';
        this.recoveryMode = false;
        this.form.patchValue({ username: this.recoveryForm.value.username });
        this.cdr.markForCheck();
      },
      error: (err: { error: { message?: string } }) => {
        this.errorMessage = err.error?.message || 'Chiave di recovery non valida';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  login() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const loginData: LoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.signIn(loginData).subscribe({
      next: () => {
        // Chiudi dialog e naviga
        const stay = this.authPrompt.stayOnPage();
        this.loading = false;
        this.close();
        if (!stay) {
          this.router.navigate(['/storie']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = httpErrorMessage(err, 'Errore nel login');
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  goToSignup(): void {
    this.switchToSignup.emit();
  }

  close(): void {
    this.closeDialog.emit();
  }
}
