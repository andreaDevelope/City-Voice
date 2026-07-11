import { ChangeDetectorRef, Component, EventEmitter,  inject,  Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/auth/auth.service";

@Component({
  selector: "app-signup-dialog",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signup-dialog.html",
  styleUrls: ["./signup-dialog.scss"],
})
export class SignupDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();

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

}
