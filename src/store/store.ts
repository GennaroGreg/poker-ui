import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cardDeckApi } from "../services/cardDeckApi";

export const store = configureStore({
    reducer: {
        [cardDeckApi.reducerPath]: cardDeckApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardDeckApi.middleware),
});

setupListeners(store.dispatch);