import './App.css'
import Dashboard from './pages/Dashboard'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    text: {
      primary: '#4C4F69', // Bleu foncé pour le texte principal
      secondary: '#013D7A', // Même couleur pour le texte secondaire
    },
    background: {
      default: '#EFF7FE', // Fond bleu clair
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Segoe UI", "Arial", sans-serif', // Police personnalisée
    allVariants: {
      color: '#4C4F69',
    },
    h1: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
    h2: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },

    body1: {
      fontFamily: '"Inter", sans-serif',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
