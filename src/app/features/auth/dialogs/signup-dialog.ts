import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { iUser } from '../../../core/auth/models/iUser';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-dialog.html',
  styleUrls: ['./signup-dialog.scss'],
})
export class SignupDialogComponent {
  @Output() closeSignupDialog = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
      next: () => {
        this.loading = false;
        this.close();
      },
      error: (err: { error: { message: string } }) => {
        this.errorMessage = err.error?.message || 'Errore nella registrazione';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  close(): void {
    this.closeSignupDialog.emit();
  }
}
