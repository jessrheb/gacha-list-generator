import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GachaData } from './data-access/gacha-data';
import { ArknightsCharacter } from './models/arknights-character.model';
import { GenshinImpactCharacter } from './models/genshin-impact-character.model';
import { HonkaiStarRailCharacter } from './models/honkai-star-rail-character.model';

@Component({
  imports: [],
  selector: 'gacha-list-generator',
  styleUrl: './list-generator.scss',
  templateUrl: './list-generator.html',
})
export class ListGenerator {
  protected readonly gachaDataService = inject(GachaData);

  readonly arknightsResource: ResourceRef<ArknightsCharacter[]> = rxResource({
    stream: () => this.gachaDataService.getArknightsCharacters(),
    defaultValue: [],
  });

  readonly genshinImpactResource: ResourceRef<GenshinImpactCharacter[]> =
    rxResource({
      stream: () => this.gachaDataService.getGenshinImpactCharacters(),
      defaultValue: [],
    });

  readonly honkaiStarRailResource: ResourceRef<HonkaiStarRailCharacter[]> =
    rxResource({
      stream: () => this.gachaDataService.getHonkaiStarRailCharacters(),
      defaultValue: [],
    });
}
