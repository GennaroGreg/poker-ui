import { Box, Button, Typography } from "@mui/material";
import { cardDeckApi } from "../services/cardDeckApi";
import { defaultDeckObject, type DeckObject, type ShuffleObject } from "../model/card-operations";
import { useState } from "react";

export default function ShuffleDeck(deckId: ShuffleObject) {
    const [shuffledDeck, setShuffledDeck] = useState<DeckObject>(defaultDeckObject)
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [trigger] = cardDeckApi.endpoints.shuffleDeck.useLazyQuery();

    const handleShuffle = async() => {
        const result = await trigger(deckId.deck_id).unwrap();
        if (!result) return <Typography>An error occurred ...</Typography>
        setShuffledDeck(result);
        setDisplayMessage(true);
        clearMessage();
    }

    const clearMessage = () => {
        const timer = setTimeout(() => {
            setDisplayMessage(false);
        }, 3500)

        return () => clearTimeout(timer);
    }
    
    return (
        <Box sx={{ mt: 4 }}>
            <Button color="success" variant="contained" onClick={handleShuffle}>Shuffle Deck</Button>
            {
                (displayMessage && shuffledDeck !== defaultDeckObject)
                ? <Typography sx={{ mt: 2 }}>The deck has been successfully shuffled!</Typography>
                : null
            }
        </Box>
    )
}