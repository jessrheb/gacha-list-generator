import { Component, inject, OnInit, ResourceRef, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GachaData } from './data-access/gacha-data';
import { ArknightsCharacter } from './models/arknights-character.model';
import { GenshinImpactCharacter } from './models/genshin-impact-character.model';
import { HonkaiStarRailCharacter } from './models/honkai-star-rail-character.model';

@Component({
  imports: [],
  selector: 'gacha-tier-list',
  styleUrl: './gacha-tier-list.scss',
  templateUrl: './gacha-tier-list.html',
})
export class GachaTierList implements OnInit {
  protected readonly gachaDataService = inject(GachaData);

  private readonly loadGenshinImpact = signal<boolean>(false);
  private readonly loadHonkaiStarRail = signal<boolean>(false);

  readonly arknightsResource: ResourceRef<ArknightsCharacter[]> = rxResource({
    stream: () => this.gachaDataService.getArknightsCharacters(),
    defaultValue: [],
  });

  readonly genshinImpactResource: ResourceRef<GenshinImpactCharacter[]> =
    rxResource({
      params: () => (this.loadGenshinImpact() ? {} : undefined),
      stream: () => this.gachaDataService.getGenshinImpactCharacters(),
      defaultValue: [],
    });

  readonly honkaiStarRailResource: ResourceRef<HonkaiStarRailCharacter[]> =
    rxResource({
      params: () => (this.loadHonkaiStarRail() ? {} : undefined),
      stream: () => this.gachaDataService.getHonkaiStarRailCharacters(),
      defaultValue: [],
    });

  ngOnInit(): void {
    if (!this.arknightsResource.isLoading()) {
      console.log(this.arknightsResource.value());
    }
  }
}
