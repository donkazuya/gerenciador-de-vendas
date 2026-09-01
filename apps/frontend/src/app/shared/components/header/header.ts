import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';

const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'purple', label: 'Roxo', color: '#7c3aed' },
  { id: 'blue', label: 'Azul', color: '#2563eb' },
  { id: 'green', label: 'Verde', color: '#15803d' },
  { id: 'dark', label: 'Escuro', color: '#8b5cf6' },
];

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  themeService = inject(ThemeService);
  themes = THEMES;

  get pageTitle(): string {
    // In a real app: inject ActivatedRoute and map path to title
    return 'Plataforma de Vendas';
  }
}
