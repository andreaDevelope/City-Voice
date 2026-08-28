import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-header-app',
  templateUrl: './header.app.html',
  styleUrls: ['./header.app.scss'],
  imports: [RouterLink],
})
export class HeaderApp {
  @Output()
  loginClick = new EventEmitter<void>();

  @Output()
  signupClick = new EventEmitter<void>();

  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  openLoginDialog() {
    this.loginClick.emit();
  }

  openSignupDialog() {
    this.signupClick.emit();
  }
}
