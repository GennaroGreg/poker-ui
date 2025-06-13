import { Box, Button, Typography } from "@mui/material";
import { cardDeckApi } from "../services/cardDeckApi";
import { defaultDeckObject, type DeckObject } from "../model/card-operations";
import { useState } from "react";

interface ShuffleDeckProps {
    deckId: string;
    setShuffled: (isShuffled: boolean) => void;
}

export default function ShuffleDeck({ deckId, setShuffled }: ShuffleDeckProps) {
    const [shuffledDeck, setShuffledDeck] = useState<DeckObject>(defaultDeckObject)
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [trigger] = cardDeckApi.endpoints.shuffleDeck.useLazyQuery();

    const executeShuffle = async () => {
        const result = await trigger(deckId).unwrap();
        if (!result) return <Typography>An error occurred ...</Typography>
        setShuffledDeck(result);
        setDisplayMessage(true);
        clearMessage();
        setShuffled(true);
    }

    const clearMessage = () => {
        const timer = setTimeout(() => {
            setDisplayMessage(false);
        }, 3500)

        return () => clearTimeout(timer);
    }

    return (
        <Box sx={{ mt: 4 }}>
            {
                (displayMessage && shuffledDeck !== defaultDeckObject)
                    ? <Typography sx={{ mt: 0 }}>The deck has been successfully shuffled!</Typography>
                    : <Button color="warning" variant="contained" onClick={executeShuffle}>Shuffle Deck</Button>
            }
        </Box>
    )
}