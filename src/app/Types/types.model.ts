export enum State {
    FirstPick,
    SecondPick,
    Checking,
    Won
}

export interface EmojiReaction{
    emoji: string;
    quote: string;
}