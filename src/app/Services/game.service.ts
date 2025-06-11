import { Injectable } from '@angular/core';
import { State, type EmojiReaction } from '../Types/types.model';

@Injectable({ providedIn: 'root' })
export class GameService {
    // Emoji collection
    emojiCollection:string[] = [
        "😀", "😂", "🥺", "😍", "👍", "🤯", "😎", "💩", "💃", "🔥",
        "🦀", "🍕", "🐶", "🐱", "🌍", "🚀", "💖", "⚽", "🎵", "📚",
        "🐎", "💻", "🏛️", "🤠", "🤩", "🌃", "🚕", "🤍", "💛", "🏙️",
        "👻", "🏰", "🐈", "🥸", "😳", "🐸", "👽", "🫎", "😨", "😱"
    ];
    
    gameState: State = State.FirstPick;          // Starting state of the game
    pairedList: string[] = this.getEmojis(8);    // game-ready paired list
    clickedCards: number[] = [];                        // Array of current clicked cards
    matchedCards: number[] = [];                        // Array of matched cards found
    fadeCards: number[] = [];                           // Temporarily holds clicked cards to fade out their emoji
    checks: number = 0;                                 // number of tries/checks/points (match checking)

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
            this.checks++;
            this.fadeCards = [...this.clickedCards];
            // If picked cards are matching, then add them to the match cards array
            if (this.pairedList[this.clickedCards[0]] == this.pairedList[this.clickedCards[1]]) {
                this.matchedCards = [...this.matchedCards, this.clickedCards[0], this.clickedCards[1]];
                if(this.matchedCards.length == 16)
                    this.gameState = State.Won;
            }
            // After 1-sec change game state to First Pick and reset clicked cards array
            setTimeout(()=>{
                this.gameState = State.FirstPick;
                this.clickedCards = [];
            }, 1000);
            setTimeout(()=>{this.fadeCards=[];}, 1300);
        }
    }

    public isGameWon(): boolean {
        return this.gameState == State.Won;
    }

    // Get live reaction while still playing
    public getLiveReaction(): EmojiReaction {
        let reaction: EmojiReaction = { emoji: "", quote: "" };
        if (this.checks <= 8) {
            reaction.emoji = "😎";
            reaction.quote = "I have a good feeling!!!";
        } else if (this.checks <= 11) {
            reaction.emoji = "🫢";
            reaction.quote = "";
        } else if (this.checks <= 14) {
            reaction.emoji = "😌";
            reaction.quote = "";
        } else if (this.checks <= 18) {
            reaction.emoji = "🙂";
            reaction.quote = "";
        } else if (this.checks <= 22) {
            reaction.emoji = "😐";
            reaction.quote = "";
        } else if (this.checks <= 26) {
            reaction.emoji = "😅";
            reaction.quote = "...";
        } else if (this.checks <= 30) {
            reaction.emoji = "🫠";
            reaction.quote = "You're melting under pressure.";
        } else if (this.checks <= 35) {
            reaction.emoji = "😭";
            reaction.quote = "Why are you doing this to yourself?";
        } else {
            reaction.emoji = "💀";
            reaction.quote = "You are cooked!";
        }
        return reaction;
    }

    // Get reaction when game is won
    public getFinalReaction(): EmojiReaction {
        let reaction: EmojiReaction = { emoji: "", quote: "" };
        if (this.checks <= 8) {
            reaction.emoji = "🧠";
            reaction.quote = "Flawless victory! You ARE the brain.";
        } else if (this.checks <= 11) {
            reaction.emoji = "😎";
            reaction.quote = "No sweat. You owned that board!";
        } else if (this.checks <= 14) {
            reaction.emoji = "😌";
            reaction.quote = "Calm, collected, and clever.";
        } else if (this.checks <= 18) {
            reaction.emoji = "🙂";
            reaction.quote = "That was pretty decent. Good job!";
        } else if (this.checks <= 22) {
            reaction.emoji = "😐";
            reaction.quote = "Meh. You did okay, I guess.";
        } else if (this.checks <= 26) {
            reaction.emoji = "😅";
            reaction.quote = "That was a close one. Barely made it!";
        } else if (this.checks <= 30) {
            reaction.emoji = "🫠";
            reaction.quote = "Oof. That board took you down a peg.";
        } else if (this.checks <= 35) {
            reaction.emoji = "😭";
            reaction.quote = "So many checks. So much pain.";
        } else {
            reaction.emoji = "💀";
            reaction.quote = "Game over. You’ve been emotionally defeated.";
        }
        return reaction;
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
