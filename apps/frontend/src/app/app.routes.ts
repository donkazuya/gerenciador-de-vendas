import { Routes } from '@angular/router';
import { Main } from './shared/components/main/main';

export const appRoutes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      }
    ],
  },
  { path: '**', redirectTo: '' },
];