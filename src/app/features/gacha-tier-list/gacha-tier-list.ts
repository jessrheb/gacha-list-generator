import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GachaData } from './data-access/gacha-data';
import { ArknightsCharacter } from './models/arknights-character.model';

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
