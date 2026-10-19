import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TierList } from './components/tier-list/tier-list';
import { GachaData } from './data-access/gacha-data';
import { ArknightsCharacter } from './models/arknights-character.model';
import { GenshinImpactCharacter } from './models/genshin-impact-character.model';
import { HonkaiStarRailCharacter } from './models/honkai-star-rail-character.model';
import { HonkaiStarRailLightCone } from './models/honkai-star-rail-light-cone.model';

@Component({
  imports: [CdkDropListGroup, TierList],
  selector: 'gacha-list-generator',
  styleUrl: './list-generator.scss',
  templateUrl: './list-generator.html',
})
export class ListGenerator {
  protected readonly gachaDataService = inject(GachaData);

  readonly arknightsCharacterResource: ResourceRef<ArknightsCharacter[]> =
    rxResource({
      stream: () => this.gachaDataService.getArknightsCharacters(),
      defaultValue: [],
    });

  readonly genshinImpactCharacterResource: ResourceRef<
    GenshinImpactCharacter[]
  > = rxResource({
    stream: () => this.gachaDataService.getGenshinImpactCharacters(),
    defaultValue: [],
  });

  readonly honkaiStarRailCharacterResource: ResourceRef<
    HonkaiStarRailCharacter[]
  > = rxResource({
    stream: () => this.gachaDataService.getHonkaiStarRailCharacters(),
    defaultValue: [],
  });

  readonly honkaiStarRailLightConeResource: ResourceRef<
    HonkaiStarRailLightCone[]
  > = rxResource({
    stream: () => this.gachaDataService.getHonkaiStarRailLightCones(),
    defaultValue: [],
  });
}
