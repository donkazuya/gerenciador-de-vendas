import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { ThemeService, Theme } from '../../services/theme.service';

const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'purple', label: 'Roxo', color: '#7c3aed' },
  { id: 'blue', label: 'Azul', color: '#2563eb' },
  { id: 'green', label: 'Verde', color: '#15803d' },
  { id: 'dark', label: 'Escuro', color: '#8b5cf6' },
];

const PATH_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Produtos',
  '/sales': 'Vendas',
  '/customers': 'Clientes',
  '/settings': 'Configurações',
};

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  readonly themes = THEMES;

  readonly pageTitle = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => PATH_TITLES[e.urlAfterRedirects] ?? 'Plataforma de Vendas'),
      startWith(PATH_TITLES[this.router.url] ?? 'Plataforma de Vendas')
    ),
    { initialValue: 'Plataforma de Vendas' }
  );
}
