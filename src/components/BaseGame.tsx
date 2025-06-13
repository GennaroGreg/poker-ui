import { Box, Button, TextField, Typography } from "@mui/material";
import { cardDeckApi } from "../services/cardDeckApi";
import ShuffleDeck from "./ShuffleDeck";
import { defaultDeckObject, type DeckObject } from "../model/card-operations";
import { useState } from "react";
import DeckDisplay from "./DeckDisplay";
import ClearGame from "./ClearGame";
import PlayerHand from "./PlayerHand";


export default function BaseGame() {
    const [deck, setDeck] = useState<DeckObject>(defaultDeckObject);
    const [shuffled, setShuffled] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");
    const [playerNameFinalized, setPlayerNameFinalized] = useState<string>("");
    const [trigger] = cardDeckApi.endpoints.getNewDeck.useLazyQuery();

    const handleGetNewDeck = async () => {
        const result = await trigger().unwrap();
        if (!result) return <Typography>An error occurred ...</Typography>
        setDeck(result);
    }

    const handleSetPlayerName = (name: string) => {
        setPlayerNameFinalized(name);
    }

    if (playerNameFinalized === "") {
        return (
            <Box sx={{ mt: 10 }}>
                <TextField
                    sx={{ input: { color: 'white' } }}
                    color="success"
                    id="player-name"
                    label="Player Name"
                    variant="filled"
                    focused
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    value={playerName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPlayerName(event.target.value);
                    }} />
                <Button sx={{ mt: 1, ml: 2 }} variant="contained" color="success" onClick={() => handleSetPlayerName(playerName)}>Go!</Button>
            </Box>
        )
    } else return (
        <Box sx={{ mt: 2 }}>
            {
                (deck !== defaultDeckObject)
                    ? <DeckDisplay />
                    : null
            }

            <br />

            {
                (deck !== defaultDeckObject)
                    ? null
                    : <Button color="success" variant="contained" onClick={handleGetNewDeck}>Get New Deck</Button>
            }


            {
                (deck !== defaultDeckObject)
                    ? <ShuffleDeck deckId={deck.deck_id} setShuffled={setShuffled} />
                    : null
            }

            <PlayerHand deckInfo={deck} playerName={playerNameFinalized} isShuffled={shuffled} />

            {
                (deck !== defaultDeckObject)
                    ? <ClearGame />
                    : null
            }

        </Box>
    )
}