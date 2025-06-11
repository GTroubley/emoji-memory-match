import { Component, inject } from '@angular/core';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  gameService = inject(GameService);

  check(index: number) {
    this.gameService.cardCheck(index);
  }
}
