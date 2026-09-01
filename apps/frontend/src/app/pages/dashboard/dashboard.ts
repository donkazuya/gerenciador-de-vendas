import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TestingIntegrationService } from '../../services/testing-integration/testing-integration.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly testingIntegrationService = inject(TestingIntegrationService);
  private readonly destroyRef = inject(DestroyRef);
  testeMessage = signal<string>("");
  teste() {
    this.testingIntegrationService
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.testeMessage.set(data.message)
        console.log(data.message);
      });
  }

  ngOnInit() {
    this.teste();
  }
}
