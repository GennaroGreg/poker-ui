export interface DeckObject {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
};

export const defaultDeckObject = {
    success: false,
    deck_id: "",
    shuffled: false,
    remaining: 52
};

export interface ShuffleObject {
    deck_id: string;
};