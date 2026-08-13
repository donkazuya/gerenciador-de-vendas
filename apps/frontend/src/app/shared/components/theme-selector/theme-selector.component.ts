import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  protected themeService = inject(ThemeService);

  onThemeChange(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
