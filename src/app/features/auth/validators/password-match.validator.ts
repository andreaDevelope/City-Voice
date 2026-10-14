import { ValidatorFn } from '@angular/forms';

export const PASSWORD_MIN = 6;
export const PASSWORD_MAX = 14;

export const passwordMatch: ValidatorFn = (group) => {
  const password = group.get('password')?.value ?? '';
  const confirmPassword = group.get('confirmPassword')?.value ?? '';
  if (!confirmPassword) {
    return null;
  }
  return password === confirmPassword ? null : { passwordMismatch: true };
};
