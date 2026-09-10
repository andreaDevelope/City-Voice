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

## Badge system — stato aggiornato

- Badge display nella pagina profilo completato: mostra per ogni categoria il badge corrente (con pallini di progresso) e il prossimo badge bloccato, coerente col mockup di riferimento.
- I pallini di progresso usano un effetto glow CSS-only (adattato da un pattern radio-button di Uiverse), pensati come indicatori indipendenti che restano accesi, non un radio button esclusivo.
- Il numero e l'accensione dei pallini NON sono ancora derivati da dati reali: dovrebbero riflettere il numero di azioni distinte richieste dalla missione (es. 1 pallino per un accesso singolo, 2 pallini per "2 quartieri diversi"), con un tetto di 3 pallini per missioni che ne richiedono di più (in quel caso ogni pallino rappresenta una fetta proporzionale). Questo è concettualmente diverso da `missionThreshold` (il punteggio totale) ogni volta che un'azione non vale esattamente 1 punto. Nessun campo BE cattura oggi "azioni richieste" — la vecchia formula `Math.ceil(counter/threshold*3)` è superata.
- Nessuna azione reale genera ancora punti per nessuna categoria (nessun endpoint di invio storia, nessuna logica like/commento) — il progresso badge oggi riflette solo lo stato seedato nel DB, non azioni utente live.

## Naming refactor (sessione dedicata)

- Tutte le classi CSS sono state convertite da BEM (`block__element`) a kebab-case semplice (`block-element`) in tutto il progetto FE. Gli stati/varianti si esprimono con annidamento SCSS (`&.modificatore`), non con suffissi BEM (`--modificatore`).
- Naming di file e cartelle standardizzato a "cartella = nome file esatto" su tutte le pagine, dialog e componenti (es. `pages/profile-page/profile-page.ts`, non più `pages/profile-page/profile.ts`).
- `home` ha ora una propria sottocartella `pages/home-page/`, allineata alle altre 4 pagine (prima era l'unica eccezione).
- I 4 model auth con notazione ungherese sono stati rinominati secondo lo standard TS: `iUser`→`User` (`user.model.ts`), `iLoginRequest`→`LoginRequest` (`login-request.model.ts`), `iAuthUser`→`AuthUser` (`auth-user.model.ts`), `iRegisterResponse`→`RegisterResponse` (`register-response.model.ts`).
- Corretti refusi di casing: `Story-social.ts`→`story-social.ts`, `header.app.*`→`header-app.*`.
- Corretto il typo storico "badje"→"badge" in tutto il progetto (classi, proprietà, file).

## Dialog di sblocco badge — rimandato

- Idea: un dialog globale (apribile da qualsiasi route) che annuncia lo sblocco di un nuovo badge, con un bottone che porta a `/profilo`.
- Meccanismo previsto (nessuna infrastruttura realtime): dopo un'azione utente che potrebbe sbloccare un badge, il FE richiama di nuovo `getMyBadgeProgress()` e confronta il risultato con lo stato precedente per rilevare un avanzamento — nessun polling, nessun WebSocket/SSE.
- Limite noto: funziona solo se il FE ricorda di richiamare il refresh esattamente dopo ogni azione rilevante; se un'azione che genera punti non passa da un punto già collegato al refresh, quello sblocco resta silente fino alla prossima visita a `/profilo`.
- Non ancora implementato — rimandato a quando esisteranno azioni reali (invio storia, like, commento) da cui agganciare il refresh.

## UI equip badge — da fare

- Selezione di max 3 badge sbloccati da mettere in evidenza nell'hero del profilo.
- Bottone "Modifica" già presente nell'hero, non ancora collegato a nessuna interazione.
- Idea originale: drag & drop su desktop, tap-poi-seleziona su mobile.
