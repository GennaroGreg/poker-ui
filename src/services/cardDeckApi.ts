import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DeckObject } from "../model/card-operations";


export const cardDeckApi = createApi({
    reducerPath: 'cardDeckApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.deckofcardsapi.com/api/",
    }),
    endpoints: (builder) => ({
        // Get a brand new deck of cards
        getNewDeck: builder.query<DeckObject, void>({ query: () => "deck/new" }),
        // Shuffle existing deck
        shuffleDeck: builder.query<DeckObject, string>({ query: (deckId) => `deck/${deckId}/shuffle` })
    }),
});

export const { useGetNewDeckQuery, useShuffleDeckQuery } = cardDeckApi;