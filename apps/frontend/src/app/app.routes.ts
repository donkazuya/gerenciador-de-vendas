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
        title: 'Dashboard | VendaFácil',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      },
      {
        path: 'products',
        title: 'Produtos | VendaFácil',
        loadComponent: () =>
          import('./pages/products/products').then(
            (m) => m.Products
          ),
      },
      {
        path: 'sales',
        title: 'Vendas | VendaFácil',
        loadComponent: () =>
          import('./pages/sales/sales').then(
            (m) => m.Sales
          ),
      },
      {
        path: 'customers',
        title: 'Clientes | VendaFácil',
        loadComponent: () =>
          import('./pages/customers/customers').then(
            (m) => m.Customers
          ),
      },
      {
        path: 'settings',
        title: 'Configurações | VendaFácil',
        loadComponent: () =>
          import('./pages/settings/settings').then(
            (m) => m.Settings
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];