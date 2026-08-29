# Authentication

## Overview

The API issues a JWT stored in an httpOnly cookie. The frontend never reads the token: it calls `/auth/me` and relies on the cookie being sent automatically.

Auth state lives in `AuthService` as a `BehaviorSubject<iAuthUser | null>`, exposed to templates as the `isLoggedIn` signal via `toSignal`.

## Startup

`provideAppInitializer` in `app.config.ts` calls `checkAuth()` before the router evaluates any route. On success it populates `authSubject` and starts the refresh timer; on failure it sets `authSubject` to null.

This runs on both server and browser, so `isLoggedIn()` is reliable from the first render.

## Interceptors

Two interceptors, registered differently:

- `HttpCredentialsInterceptor` — class-based, registered via `HTTP_INTERCEPTORS`. Sets `withCredentials: true` on every request.
- `ssrCookieInterceptor` — functional, registered via `withInterceptors`. Server-side only.

`provideHttpClient` includes both `withInterceptorsFromDi()` and `withInterceptors([...])`. Without `withInterceptorsFromDi()`, class-based interceptors are never instantiated in a standalone application.

### SSR cookie forwarding

During server-side rendering the browser cookie is not attached to outgoing HTTP calls: the server issues its own requests, unrelated to the incoming one.

`ssrCookieInterceptor` injects the `REQUEST` token from `@angular/core`, reads the incoming `Cookie` header and copies it onto the outgoing request. Without this, `checkAuth()` always fails during SSR and the server renders every page as anonymous, causing a flash of unauthenticated UI after hydration.

`REQUEST` is populated automatically by `AngularNodeAppEngine`; no configuration is required in `server.ts` or `app.config.server.ts`.

## Render mode

`app.routes.server.ts` sets `RenderMode.Server` on `**`.

`RenderMode.Prerender` generates static HTML at build time and skips SSR execution entirely at request time, so interceptors and initializers never run. Every route here depends on auth state, so prerendering is not usable.

The tradeoff is that no route is cached as a static file.

## Route guard

`authGuard` protects `/setting` and `/profilo`:

    export const authGuard: CanActivateFn = () => {
      const authService = inject(AuthService);
      const router = inject(Router);
      return authService.isLoggedIn() || router.parseUrl('/');
    };

The guard returns a `UrlTree`, not `false`.

Returning `false` cancels the navigation. During SSR there is no previous successful navigation to fall back on, so `@angular/ssr` treats the render as failed, returns no `Response`, and the Express handler falls through to a 404. This is documented behaviour, not a bug — see angular/angular#16211 and #17004.

A `UrlTree` is a valid navigation, so the SSR engine emits a 302 redirect instead.

### Query parameters are lost on redirect

The redirect target's query string does not survive: `@angular/ssr` builds the `Location` header from the path only. Passing intent through the URL — for example `/?authPrompt=signup` to open a dialog after a blocked navigation — does not work for direct URL entry.

## Auth prompt

`AuthPromptService` is a root-level signal holder. `Shell` binds `signupDialogOpen` to its `isOpen` signal and renders the signup dialog conditionally.

Any component can call `open()` without knowing about `Shell`. It is currently called only from `Shell` itself, wired to the header buttons.

The guard does not call it: the service instance created during SSR is destroyed when the redirect is issued, so state set there never reaches the browser.

## Token refresh

`startRefreshTimer()` schedules a call to `/auth/refresh-token` five minutes before the 24-hour token expiry, then reschedules itself. On failure it navigates to `/` and clears the session.

The timer is client-side only in practice: the server-rendered instance is discarded after each request.
