import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DealObject, DeckObject } from "../model/card-operations";


export const cardDeckApi = createApi({
    reducerPath: 'cardDeckApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.deckofcardsapi.com/api/",
    }),
    endpoints: (builder) => ({
        // Get a brand new deck of cards
        getNewDeck: builder.query<DeckObject, void>({ query: () => "deck/new" }),
        // Shuffle existing deck
        shuffleDeck: builder.query<DeckObject, string>({ query: (deckId: string) => `deck/${deckId}/shuffle` }),
        // Deal a hand of 2 to the Player
        dealCards: builder.query<DealObject, {deckId: string, count: number}>({ query: ({deckId, count}) => `deck/${deckId}/draw/?count=${count}`})
    }),
});

export const { useGetNewDeckQuery, useShuffleDeckQuery, useDealCardsQuery } = cardDeckApi;