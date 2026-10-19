import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';

@Component({
  imports: [CdkDrag, CdkDropList],
  selector: 'gacha-droplist',
  styleUrl: './droplist.scss',
  templateUrl: './droplist.html',
})
export class Droplist {
  readonly itemsList = input<unknown[]>([]);

  drop(event: CdkDragDrop<unknown[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
