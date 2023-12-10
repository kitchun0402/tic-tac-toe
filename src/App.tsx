import { ModalProvider } from 'styled-react-modal'
import TicTacToe from './containers/TicTacToe/TicTacToe'
import { GlobalStyle } from './globalStyles'

function App() {
  return (
    <ModalProvider>
      <GlobalStyle />
      <TicTacToe />
    </ModalProvider>
  )
}

export default App
