import { Component, computed, signal } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';
import { Search } from '@primeicons/angular/search';
import { AccordionModule } from 'primeng/accordion';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Tier } from '../tier/tier';
import { GACHA_OPTIONS, TIER_LABELS } from './tier-list.constants';
import { GachaDataTitle } from './tier-list.model';

@Component({
  selector: 'gacha-tier-list',
  templateUrl: './tier-list.html',
  styleUrl: './tier-list.scss',
  imports: [
    AccordionModule,
    AutoCompleteModule,
    FloatLabelModule,
    FormField,
    IconFieldModule,
    InputIconModule,
    Search,
    Tier,
  ],
})
export class TierList {
  protected readonly tierLabels: string[] = TIER_LABELS;
  private readonly _gachaOptions = signal(GACHA_OPTIONS);

  protected gachaSearchForm = form(
    signal<GachaDataTitle | null>(null),
    (schemaPath) => {
      debounce(schemaPath, 300);
    },
  );

  protected readonly gachaOptions = computed<GachaDataTitle[]>(() => {
    const input = (this.gachaSearchForm().value() ?? '').trim().toLowerCase();

    if (!input) return [];
    else
      return this._gachaOptions().filter(
        (option) =>
          option.toLowerCase().includes(input) &&
          !this.selectedGames().includes(option),
      );
  });

  protected readonly selectedGames = signal<GachaDataTitle[]>([]);

  protected handleSelection(selection: AutoCompleteSelectEvent): void {
    const currentSelection = selection.value as GachaDataTitle;

    this.selectedGames.update((previousSelections) => {
      if (previousSelections.includes(currentSelection)) {
        return previousSelections;
      } else return [...previousSelections, currentSelection];
    });
  }
}
