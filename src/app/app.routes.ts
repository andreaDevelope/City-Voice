import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home').then((m) => m.Home),
      },
      {
        path: 'storie',
        loadComponent: () =>
          import('./features/stories/pages/stories-list-page/stories-list').then(
            (m) => m.StoriesList,
          ),
      },
      {
        path: 'racconta',
        loadComponent: () =>
          import('./features/stories/pages/story-create-page/story-create').then(
            (m) => m.StoryCreate,
          ),
      },
      {
        path: 'setting',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/stories/pages/setting-page/setting').then((m) => m.Setting),
      },
      {
        path: 'profilo',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/pages/profile-page/profile').then((m) => m.Profile),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
