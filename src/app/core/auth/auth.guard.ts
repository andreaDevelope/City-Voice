import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthPromptService } from './auth-prompt.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const authPrompt = inject(AuthPromptService);

  if (authService.isLoggedIn()) {
    return true;
  }

  authPrompt.open();
  return false;
};
