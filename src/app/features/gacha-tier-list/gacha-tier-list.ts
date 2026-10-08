import { Component, inject, signal } from '@angular/core';
import { GachaData } from './data-access/services/gacha-data';

@Component({
  imports: [],
  selector: 'gacha-tier-list',
  styleUrl: './gacha-tier-list.scss',
  templateUrl: './gacha-tier-list.html',
})
export class GachaTierList {
  protected readonly gachaDataService = inject(GachaData);
  readonly users = signal<[]>([]);
}
