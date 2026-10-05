import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tierlist } from './tierlist/tierlist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tierlist],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tierlister');
}
