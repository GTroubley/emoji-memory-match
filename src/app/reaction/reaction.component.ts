import { Component, inject } from '@angular/core';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-reaction',
  imports: [],
  templateUrl: './reaction.component.html',
  styleUrl: './reaction.component.scss'
})
export class ReactionComponent {
  gameService = inject(GameService);
}
