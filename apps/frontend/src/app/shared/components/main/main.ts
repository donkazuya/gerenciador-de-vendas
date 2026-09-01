import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  collapsed = signal(false);
}
