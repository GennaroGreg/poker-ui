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

export interface CardObject {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string
    suit: string
}

export const defaultCardObject = {
    code: "",
    image: "",
    images: {
        svg: "",
        png: "",
    },
    value: "",
    suit: ""
}

export interface DealObject {
    success: boolean;
    deck_id: string;
    cards: CardObject[];
    remaining: number;
}

export const defaultDealObject = {
    success: "",
    deck_id: "",
    cards: [defaultCardObject, defaultCardObject],
    remaining: 0
}