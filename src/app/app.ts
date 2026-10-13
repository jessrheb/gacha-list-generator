import { Component, signal } from '@angular/core';
import { ListGenerator } from './features/list-generator/list-generator';

@Component({
  selector: 'gacha-root',
  imports: [ListGenerator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Gacha List Generator');
}
