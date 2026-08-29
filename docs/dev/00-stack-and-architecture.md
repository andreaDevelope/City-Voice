# Stack and Architecture

## Frontend

| | |
|---|---|
| Framework | Angular 21, standalone components |
| Rendering | SSR via `@angular/ssr` + Express 5 |
| Language | TypeScript 5.9, strict mode |
| Styles | SCSS |
| Testing | Vitest |
| Node | 20.19+ |

## Backend

Separate repository: Spring Boot 4.1, Java 21, PostgreSQL.

## Folder structure

    src/app/
    ├── core/          # auth, http interceptors
    ├── features/      # one folder per domain
    │   ├── auth/
    │   ├── home/
    │   ├── profile/
    │   └── stories/
    ├── layout/        # shell, header, mobile nav
    └── shared/        # components used across features

Feature-based structure: pages, components and models belonging to a feature live inside that feature's folder. `shared/` contains only cross-feature code.

Each feature follows:

    features/<name>/
    ├── pages/         # routed components
    ├── components/    # feature-local components
    └── models/        # interfaces and types

## Configuration

Environment config in `src/environments/`:

- `environment.ts` — development, API at `http://localhost:8080/api`
- `environment.prod.ts` — production, API at `/api` (same-origin deployment)

Swapped at build time via `fileReplacements` in `angular.json`.

## State management

Auth state is exposed as a signal from `AuthService` (`isLoggedIn`), derived from an internal `BehaviorSubject` via `toSignal`.
