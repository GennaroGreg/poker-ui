import { Button, Container, Typography } from "@mui/material";
import { cardDeckApi } from "../services/cardDeckApi";
import ShuffleDeck from "./ShuffleDeck";
import { defaultDeckObject, type DeckObject } from "../model/card-operations";
import { useState } from "react";
import DeckDisplay from "./DeckDisplay";
import ClearGame from "./ClearGame";


export default function DeckActions() {
    const [deck, setDeck] = useState<DeckObject>(defaultDeckObject);
    const [trigger] = cardDeckApi.endpoints.getNewDeck.useLazyQuery();

    const handleGetNewDeck = async() => {
        const result = await trigger().unwrap();
        if (!result) return <Typography>An error occurred ...</Typography>
        setDeck(result);
    }

    return (
        <Container>
            {
                (deck !== defaultDeckObject)
                ? <DeckDisplay />
                : null
            }
            <br />
            <Button color="success" variant="contained" onClick={handleGetNewDeck}>Get New Deck</Button>

            {
                (deck !== defaultDeckObject)
                ? <ShuffleDeck deck_id={deck.deck_id} />
                : null
            }

            {
                (deck !== defaultDeckObject)
                ? <ClearGame />
                : null
            }
            
        </Container>
    )
}