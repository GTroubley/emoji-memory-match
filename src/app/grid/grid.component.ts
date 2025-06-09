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
  emojiList:string[] = this.gameService.pairedList;
  clickedCards: number[] = [];
  matchedCards: number[] = [];

  check(index:number){
    if(this.matchedCards.includes(index)) return;
    if(this.clickedCards.length >= 2){
      this.clickedCards = [];
    }
    this.clickedCards.push(index);
    if(this.gameService.pairedList[this.clickedCards[0]] == this.gameService.pairedList[this.clickedCards[1]]){
        this.matchedCards.push(this.clickedCards[0]);
        this.matchedCards.push(this.clickedCards[1]);
        this.clickedCards = [];
    }
  }
}
