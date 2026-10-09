import { Injectable, computed, signal } from '@angular/core';

export type AuthDialog = 'login' | 'signup' | 'recovery-key';

@Injectable({ providedIn: 'root' })
export class AuthPromptService {
  private readonly _active = signal<AuthDialog | null>(null);
  private readonly _recoveryKey = signal<string | null>(null);
  private readonly _stayOnPage = signal(false);

  readonly active = this._active.asReadonly();
  readonly recoveryKey = this._recoveryKey.asReadonly();
  readonly stayOnPage = this._stayOnPage.asReadonly();

  readonly isLoginOpen = computed(() => this._active() === 'login');
  readonly isSignupOpen = computed(() => this._active() === 'signup');
  readonly isRecoveryKeyOpen = computed(() => this._active() === 'recovery-key');

  openLogin(options?: { stayOnPage?: boolean }): void {
    if (options) {
      this._stayOnPage.set(options.stayOnPage ?? false);
    }
    this._active.set('login');
  }

  openSignup(options?: { stayOnPage?: boolean }): void {
    if (options) {
      this._stayOnPage.set(options.stayOnPage ?? false);
    }
    this._active.set('signup');
  }

  openRecoveryKey(key: string): void {
    this._recoveryKey.set(key);
    this._active.set('recovery-key');
  }

  close(): void {
    this._active.set(null);
    this._recoveryKey.set(null);
    this._stayOnPage.set(false);
  }
}
