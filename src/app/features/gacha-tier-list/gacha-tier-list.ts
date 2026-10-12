import { Component, inject, ResourceRef, signal } from '@angular/core';
import { GachaData } from './data-access/services/gacha-data';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'gacha-tier-list',
  styleUrl: './gacha-tier-list.scss',
  templateUrl: './gacha-tier-list.html',
})
export class GachaTierList {
  protected readonly gachaDataService = inject(GachaData);

  readonly arknightsResource: ResourceRef<ArknightsCharacter[]> = rxResource({
    stream: () => this.gachaDataService.getArknightsCharacters(),
    defaultValue: [],
  });
}
