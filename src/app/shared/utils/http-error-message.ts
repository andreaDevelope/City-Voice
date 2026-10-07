import { HttpErrorResponse } from '@angular/common/http';

export function httpErrorMessage(err: HttpErrorResponse, fallback: string): string {
  const body: unknown = err.error;
  if (!body || typeof body !== 'object') {
    return fallback;
  }

  const fields = body as Record<string, unknown>;
  const message = fields['message'];
  if (typeof message === 'string' && message) {
    return message;
  }

  const first = Object.values(fields)[0];
  return typeof first === 'string' ? first : fallback;
}
