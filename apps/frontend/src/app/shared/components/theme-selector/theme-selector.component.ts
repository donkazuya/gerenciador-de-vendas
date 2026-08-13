import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';


@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  protected themeService = inject(ThemeService);

  onThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.themeService.setTheme(select.value as Theme);
  }
}
