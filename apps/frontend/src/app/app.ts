import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';
import { ThemeSelectorComponent } from './shared/components/theme-selector/theme-selector.component';

@Component({
  imports: [RouterModule, ThemeSelectorComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'gerenciador-vendas-frontend';
  protected themeService = inject(ThemeService);
}
