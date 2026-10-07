# Stack and Architecture

## Frontend

|           |                                    |
| --------- | ---------------------------------- |
| Framework | Angular 21, standalone components  |
| Rendering | SSR via `@angular/ssr` + Express 5 |
| Language  | TypeScript 5.9, strict mode        |
| Styles    | SCSS                               |
| Testing   | Vitest                             |
| Node      | 20.19+                             |

## Backend

Separate repository: Spring Boot 4.1, Java 21, PostgreSQL.

## Folder structure

    src/app/
    ├── core/          # auth, http interceptors
    ├── features/      # one folder per domain
    │   ├── auth/
    │   ├── districts/
    │   ├── home/
    │   ├── profile/
    │   └── stories/
    ├── layout/        # shell, header, mobile nav
    └── shared/
        └── ui/        # components reused across features: avatar, progress-dots, badge-unlocked-dialog

Feature-based structure: pages, components and models belonging to a feature live inside that feature's folder. `shared/` contains only cross-feature code.

Each feature follows:

    features/<name>/
    ├── pages/         # routed components
    ├── components/    # feature-local components
    ├── models/        # interfaces and types
    ├── services/      # HTTP calls
    └── styles/        # SCSS partials shared by the feature's components

## Configuration

Environment config in `src/environments/`:

- `environment.ts` — development, API at `http://localhost:8080/api/cityvoice`
- `environment.prod.ts` — production, API at `/api/cityvoice` (same-origin deployment)

Swapped at build time via `fileReplacements` in `angular.json`.

## State management

Auth state is exposed as a signal from `AuthService` (`isLoggedIn`), derived from an internal `BehaviorSubject` via `toSignal`.

## Badge progress

Progress dots are derived from `/badge/progress`. The number of dots is `min(threshold, 3)`; lit dots are `min(dots, floor(counter × dots / threshold))`, where the threshold is `currentBadge.missionThreshold`. Badges with threshold 0 show no dots. Component: `shared/ui/progress-dots`, colored through `--dot-color`.

## Conventions

CSS classes are kebab-case; states use SCSS nesting (`&.state`). Folder name equals file name, e.g. `pages/profile-page/profile-page.ts`.

## Badge unlock

After a submission, `/racconta` compares the progress loaded on login with the progress returned by the POST. A badge is unlocked when the counter was below the `currentBadge` threshold and now reaches it. `shared/ui/badge-unlocked-dialog` uses the native `<dialog>` and opens with `showModal()` inside `afterNextRender`, so only in the browser. Multiple unlocks are shown in sequence.

Limit: the diff runs only on `/racconta`. Comments and reactions are not wired yet, so unlocks they cause are not announced.

## Featured badges UI — to do

- Select up to 3 unlocked badges to feature in the profile hero.
- The "Modifica" button is already in the hero, not wired yet.
- Original idea: drag and drop on desktop, tap-then-select on mobile.
