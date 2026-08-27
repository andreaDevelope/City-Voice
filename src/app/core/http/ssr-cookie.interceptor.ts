import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';

export const ssrCookieInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformServer(platformId)) {
    return next(req);
  }

  const request = inject(REQUEST, { optional: true });
  const cookie = request?.headers.get('cookie');

  if (!cookie) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Cookie: cookie } }));
};
