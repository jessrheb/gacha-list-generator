import { Component, inject, OnInit } from '@angular/core';
import { GachaData } from './data-access/services/gacha-data';

@Component({
  imports: [],
  selector: 'app-tierlist',
  styleUrl: './tierlist.scss',
  templateUrl: './tierlist.html',
})
export class Tierlist implements OnInit {
  protected readonly gachaDataService = inject(GachaData);

  ngOnInit(): void {}
}
