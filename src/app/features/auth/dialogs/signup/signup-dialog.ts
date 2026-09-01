import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { iUser } from '../../../../core/auth/models/iUser';

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

    const signupData: iUser = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.register(signupData).subscribe({
      next: (response) => {
        this.loading = false;
        this.registered.emit(response.recoveryKey);
      },
      error: (err: { error: Record<string, string> }) => {
        let errorMessage: string;

        if (err.error?.['message']) {
          // Caso normale: BE ha risposto {"message": "..."} (conflitto, credenziali, ecc.)
          errorMessage = err.error['message'];
        } else if (err.error && Object.keys(err.error).length > 0) {
          // Caso validazione: BE ha risposto {"username": "..."} o {"password": "..."}
          // Non ho un campo "message", ma ho un oggetto con almeno un errore dentro.
          // Prendo il primo valore, qualunque sia il nome del campo.
          const primoErrore = Object.values(err.error)[0];
          errorMessage = primoErrore;
        } else {
          errorMessage = 'Errore nella registrazione';
        }

        this.errorMessage = errorMessage;
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  close(): void {
    this.closeSignupDialog.emit();
  }
}
