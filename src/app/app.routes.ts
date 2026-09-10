import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page').then((m) => m.Home),
      },
      {
        path: 'storie',
        loadComponent: () =>
          import('./features/stories/pages/stories-list-page/stories-list-page').then(
            (m) => m.StoriesList,
          ),
      },
      {
        path: 'racconta',
        loadComponent: () =>
          import('./features/stories/pages/story-create-page/story-create-page').then(
            (m) => m.StoryCreate,
          ),
      },
      {
        path: 'setting',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/stories/pages/setting-page/setting-page').then((m) => m.Setting),
      },
      {
        path: 'profilo',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/pages/profile-page/profile-page').then((m) => m.Profile),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
