import { Button } from "@mui/material";

export default function ClearGame() {
    
    return (
        <Button sx={{ mt: 4 }} color="error" variant="contained" onClick={() => window.location.reload()}>Clear Current Game</Button>
    );
}