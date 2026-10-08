import { Component, signal } from '@angular/core';
import { GachaTierList } from './features/gacha-tier-list/gacha-tier-list';

@Component({
  selector: 'gacha-root',
  imports: [GachaTierList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Gacha Tier List');
}
