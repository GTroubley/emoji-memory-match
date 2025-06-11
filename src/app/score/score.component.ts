import { Component, inject } from '@angular/core';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  gameService = inject(GameService);
}
