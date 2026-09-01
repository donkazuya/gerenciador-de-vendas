import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html'  ,
  styleUrl: './app.css',
})
export class App {
  protected title = 'gerenciador-vendas-frontend';
}
 