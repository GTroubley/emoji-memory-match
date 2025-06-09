import { Injectable } from '@angular/core';

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
