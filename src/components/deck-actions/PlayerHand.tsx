import { Box, Button, Stack, Typography } from "@mui/material";
import { defaultDealObject, type CardObject, type DeckObject } from "../../model/card-operations";
import { cardDeckApi } from "../../services/cardDeckApi";
import { useState } from "react";

interface PlayerHandProps {
    deckInfo: DeckObject;
    playerName: string;
    isShuffled: boolean;
}

export default function PlayerHand({ deckInfo, playerName, isShuffled }: PlayerHandProps) {
    const [dealtCards, setDealtCards] = useState<CardObject[]>(defaultDealObject.cards)
    const [revealCards, setRevealCards] = useState<boolean>(false);
    const cardBackUrl = "https://www.deckofcardsapi.com/static/img/back.png";
    const [trigger] = cardDeckApi.endpoints.dealCards.useLazyQuery();

    const handleDealHand = async (deckId: string, count: number) => {
        const result = await trigger({ deckId, count }).unwrap();
        if (!result) return <Typography>An error occurred ...</Typography>;
        setDealtCards(result.cards);
    };

    const handleShowHoleCards = (revealCards: boolean) => {
        if (revealCards) setRevealCards(false);
        if (!revealCards) setRevealCards(true);
    }

    if (dealtCards !== defaultDealObject.cards) {
        return (
            <Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 2, height: 575 }}>
                    <Stack sx={{ mt: 10 }} direction={'column'}>
                        <Typography variant="h4">{playerName}'s Hole Cards</Typography>
                        <Stack sx={{ mt: 1 }} direction={'row'}>
                            {
                                (revealCards)
                                    ?
                                    dealtCards.map((card) => {
                                        return (
                                            <Box key={card.code} sx={{ height: 250 }} component={"img"} src={card.image} />
                                        )
                                    })
                                    :
                                    dealtCards.map((card) => {
                                        return (
                                            <Box key={card.code} sx={{ height: 250 }} component={"img"} src={cardBackUrl} />
                                        )
                                    })
                            }
                        </Stack>
                        <Box sx={{ mt: 1 }}>
                            {
                                (revealCards)
                                    ? <Button variant="contained" color="warning" onClick={() => handleShowHoleCards(revealCards)}>Hide Cards</Button>
                                    : <Button variant="contained" color="success" onClick={() => handleShowHoleCards(revealCards)}>Reveal Cards</Button>
                            }
                        </Box>
                    </Stack>
                </Box>
            </Box>
        )
    } else if (deckInfo.deck_id !== "" && isShuffled) {
        return (
            <Box sx={{ mt: 2, height: 575 }}>
                <Button variant="contained" color="success" onClick={() => handleDealHand(deckInfo.deck_id, 2)}>Deal Hole Cards</Button>
            </Box>
        );
    } else {
        return (
            <Box sx={{ mt: 2, height: 575 }} />
        )
    }
};