import { Injectable } from '@angular/core';
import { State } from '../Types/types.model';

@Injectable({ providedIn: 'root' })
export class GameService {
    // Emoji collection
    private emojiCollection:string[] = [
        "😀", "😂", "🥺", "😍", "👍", "🤯", "😎", "💩", "💃", "🔥",
        "🦀", "🍕", "🐶", "🐱", "🌍", "🚀", "💖", "⚽", "🎵", "📚",
        "🐎", "💻", "🏛️", "🤠", "🤩", "🌃", "🚕", "🤍", "💛", "🏙️",
        "👻", "🏰", "🐈", "🥸", "😳", "🐸", "👽", "🫎", "😨", "😱"
    ];
    // game-ready paired list
    public pairedList: string[] = this.getEmojis(8);
    public gameState: State = State.FirstPick;
    clickedCards: number[] = [];    // Array of current clicked cards
    matchedCards: number[] = [];    // Array of matched cards found
    fadeCards: number[] = [];       // Temporarily holds clicked cards to fade out their emoji


    public cardCheck(index:number){
        // If the clicked card's index exists in clicked cards or in matched cards, pick is invalid and returns
        if (this.clickedCards.includes(index) || this.matchedCards.includes(index)) return;
        // If game state is Checking (waiting for setTimeout to end) to pick again
        if (this.gameState == State.Checking) return;
        // Card picking states
        const cardPickingStates: State[] = [State.FirstPick,State.SecondPick];
        // If game is in card picking state (pick of 1st or 2nd card)
        if (cardPickingStates.includes(this.gameState)) {  
            if (this.clickedCards.length >= 2) {        // If there are 2 clicked cards
                this.gameState = State.Checking;        // Set game state to Checking
            }else{                                      // Else
                this.clickedCards.push(index);          // Add the clicked card in clicked cards
                this.gameState++;                       // Move to the next state (FirstPick -> SecondPick)
            }
        }
        // If game is in card checking state
        if (State.Checking === this.gameState) {
            this.fadeCards = [...this.clickedCards];
            // If picked cards are matching, then add them to the match cards array
            if (this.pairedList[this.clickedCards[0]] == this.pairedList[this.clickedCards[1]]) {
                this.matchedCards = [...this.matchedCards, this.clickedCards[0], this.clickedCards[1]];
            }
            // After 1-sec change game state to First Pick and reset clicked cards array
            setTimeout(()=>{
                this.gameState = State.FirstPick;
                this.clickedCards = [];
            }, 1000);
            setTimeout(()=>{this.fadeCards=[];}, 1300);
        }
    }

    // Creates & Returns the game-ready paired emoji list
    private getEmojis(pairs: number){
        let initialEmojiList = [...this.emojiCollection];       // Create a copy of the emoji list
        this.fisherYatesShuffle(initialEmojiList);              // Shuffle that list
        let chosenEmojis = initialEmojiList.slice(0, pairs);    // Get the emojis from 0 to pairs
        let pairedEmojis = [...chosenEmojis, ...chosenEmojis];  // Duplicate the list
        this.fisherYatesShuffle(pairedEmojis);                  // Shuffles the final list
        return pairedEmojis;
    }

    // Fisher Yates shuffle function
    private fisherYatesShuffle(array: string[]){
        for(let i=array.length-1;i>0;i--){
            let j = Math.floor(Math.random()*(i+1));
            let swapTemp = array[i];
            array[i] = array[j];
            array[j] = swapTemp;
        }
    }
}
