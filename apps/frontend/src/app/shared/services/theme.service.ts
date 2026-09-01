import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'purple' | 'blue' | 'green' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly current = signal<Theme>('purple');

  constructor() {
    // Persist theme across reloads
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) this.current.set(saved);

    // Apply data-theme attribute whenever signal changes
    effect(() => {
      const theme = this.current();
      document.documentElement.dataset['theme'] = theme === 'purple' ? '' : theme;
      localStorage.setItem('theme', theme);
    });
  }

  set(theme: Theme): void {
    this.current.set(theme);
  }
}
