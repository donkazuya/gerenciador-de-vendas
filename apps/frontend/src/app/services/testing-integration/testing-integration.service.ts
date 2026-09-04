import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IntegrationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestingIntegrationService {
  private readonly http = inject(HttpClient);

  getData(): Observable<IntegrationResponse> {
    return this.http.get<IntegrationResponse>('http://localhost:3000/api/teste/dados');
  }
}