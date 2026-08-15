import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { iLoginRequest } from '../../../../core/auth/models/iLoginRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { iAccessData } from '../../../../core/auth/models/iAccessData';

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
  private fb: FormBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) return;
    this.router.navigate(['/setting']);
    this.loading = true;
    this.errorMessage = '';

    const loginData: iLoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        // Login riuscito, token è nel cookie
        // Avvia il timer per il refresh proattivo
        this.authService.startRefreshTimer();
        this.loading = false;
        this.close();
      },
      error: (err: { error: { message: string } }) => {
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
