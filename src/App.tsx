import './App.css'
import { Container } from '@mui/material'
import DeckActions from './components/BaseGame';
import Welcome from './components/Welcome';

function App() {
  return (
    <Container>
      <Welcome />
      <DeckActions />
    </Container>

  )
}

export default App
