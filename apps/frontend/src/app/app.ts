import { Component, inject, DestroyRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeSelectorComponent } from './shared/components/theme-selector/theme-selector.component';
import { ThemeService } from './shared/services/theme.service';
import { TestingIntegrationService } from './services/testing-integration/testing-integration.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterModule, ThemeSelectorComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'gerenciador-vendas-frontend';
  protected themeService = inject(ThemeService);
  private readonly testingIntegrationService = inject(TestingIntegrationService);
  private readonly destroyRef = inject(DestroyRef);
  testeMessage: string = "";

  teste() {
    this.testingIntegrationService
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.testeMessage = data.message
        console.log(data.message);
      });
  }
}
