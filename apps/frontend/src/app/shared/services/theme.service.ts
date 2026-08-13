import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'midnight' | 'emerald' | 'sunset' | 'dracula';

export interface ThemeOption {
  id: Theme;
  label: string;
  color: string; // Para exibir um preview do tema na UI
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Lista dos 6 temas disponíveis
  readonly themes: ThemeOption[] = [
    { id: 'light', label: 'Claro', color: '#2563eb' },
    { id: 'dark', label: 'Escuro', color: '#3b82f6' },
    { id: 'midnight', label: 'Midnight', color: '#ec4899' },
    { id: 'emerald', label: 'Emerald', color: '#10b981' },
    { id: 'sunset', label: 'Sunset', color: '#f97316' },
    { id: 'dracula', label: 'Dracula', color: '#ff79c6' },
  ];

  // Signal reativo para o tema atual
  currentTheme = signal<Theme>('light');

  constructor() {
    const savedTheme = (localStorage.getItem('app-theme') as Theme) || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }
}
