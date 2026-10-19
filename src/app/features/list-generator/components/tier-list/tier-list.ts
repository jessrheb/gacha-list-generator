import { Component, computed, signal } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tier } from '../tier/tier';
import { SUPPORTED_GACHA, TIER_LABELS } from './tier-list.constants';

@Component({
  selector: 'gacha-tier-list',
  templateUrl: './tier-list.html',
  styleUrl: './tier-list.scss',
  imports: [
    FormField,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    Tier,
  ],
})
export class TierList {
  protected readonly searchLabel: string = 'Gacha';
  protected readonly tierLabels: string[] = TIER_LABELS;

  private readonly _gachaOptions = signal(SUPPORTED_GACHA);
  protected gachaSearchForm = form(signal<string>(''), (schemaPath) => {
    debounce(schemaPath, 300);
  });

  protected gachaOptions = computed<string[]>(() => {
    const userInput = this.gachaSearchForm().value().trim().toLowerCase();
    if (!userInput) {
      return [];
    }
    return this._gachaOptions().filter((option) =>
      option.toLowerCase().includes(userInput),
    );
  });
}
