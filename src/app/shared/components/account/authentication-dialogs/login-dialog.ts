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
    this.loading = true;
    this.errorMessage = '';

    const loginData: iLoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        // Login riuscito, token è nel cookie
        // Ora recupera i dati dell'utente e ripristina lo stato
        this.authService.checkAuth().subscribe({
          next: (user) => {
            // Salva l'utente in memoria
            this.authService.authSubject.next(user);

            // Avvia il timer per il refresh proattivo
            this.authService.startRefreshTimer();

            // Chiudi dialog e naviga
            this.loading = false;
            this.close();
            this.router.navigate(['/setting']);
          },
          error: (err) => {
            this.errorMessage = 'Errore nel recuperare i dati utente' + err.error?.message || '';
            this.loading = false;
            this.cdr.markForCheck();
          },
        });
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
