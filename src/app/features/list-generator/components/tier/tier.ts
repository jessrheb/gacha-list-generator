import { Component, input } from '@angular/core';
import { Droplist } from '../droplist/droplist';

@Component({
  imports: [Droplist],
  selector: 'gacha-tier',
  styleUrl: './tier.scss',
  templateUrl: './tier.html',
})
export class Tier {
  readonly tierLabel = input<string | null>(null);
}
