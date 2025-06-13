import { Box } from "@mui/material";

export default function DeckDisplay() {
    const cardBackUrl = "https://www.deckofcardsapi.com/static/img/back.png"

    return (
        <Box sx={{ height: 250 }} component={"img"} src={cardBackUrl} />
    );
}