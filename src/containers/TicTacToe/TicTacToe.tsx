import { useState } from 'react'
import Board from '../../components/Board/Board'
import Button from '../../components/buttons/Button'
import GamePanel from '../../components/GamePanel/GamePanel'
import GameRecords from '../../components/GameRecords/GameRecords'
import Modal from '../../components/Modal/Modal'
import useGameStates from '../../hooks/useGameStates'
import { type GameHistory } from '../../types/gameStates'
import {
  Container,
  ModalContentWrapper,
  PlayerTurnLabel,
} from './TicTacToe.elements'

function TicTacToe() {
  const {
    currentGameStates: { playerTurn, tiles, gameResult },
    gameHistory,
    handleTileClick,
    resetGame,
    clearGameHistory,
    updateCurrentGameStates,
    updateGameMode,
  } = useGameStates()

  const [isGameModeModalOpen, setIsGameModeModalOpen] = useState(true)
  const [isGameHistoryModalOpen, setIsGameHistoryModalOpen] = useState(false)
  const handleClickModeButton = () => {
    setIsGameModeModalOpen(true)
  }
  const handleClickHistoryButton = () => {
    setIsGameHistoryModalOpen(true)
  }
  const selectGameMode = (mode: 'PvP' | 'PvC' | 'Resume') => {
    if (mode !== 'Resume') {
      updateGameMode(mode)
    }
    setIsGameModeModalOpen(false)
  }

  const closeHistoryModal = () => {
    setIsGameHistoryModalOpen(false)
  }

  const viewSelectedGameRecord = (record: GameHistory[0]) => {
    updateCurrentGameStates(() => record)
    closeHistoryModal()
  }
  return (
    <Container>
      {!gameResult && playerTurn && (
        <PlayerTurnLabel>{playerTurn} turn</PlayerTurnLabel>
      )}
      {gameResult && (
        <PlayerTurnLabel>
          {gameResult === 'DRAW' ? 'Tied' : `${gameResult} won!`}
        </PlayerTurnLabel>
      )}
      <Board tiles={tiles} onTileClick={handleTileClick} />
      <GamePanel
        onClickReset={resetGame}
        onClickMode={handleClickModeButton}
        onClickHistory={handleClickHistoryButton}
      />
      {/** @todo can extract it into a seperate component */}
      {isGameModeModalOpen && (
        <Modal isOpen={isGameModeModalOpen}>
          <ModalContentWrapper>
            <h1>Game Mode</h1>
            <Button onClick={() => selectGameMode('PvC')}>Solo (PvC)</Button>
            <Button onClick={() => selectGameMode('PvP')}>Battle (PvP)</Button>
            <Button onClick={() => selectGameMode('Resume')}>Resume</Button>
          </ModalContentWrapper>
        </Modal>
      )}
      {/** @todo can extract it into a seperate component */}
      {isGameHistoryModalOpen && (
        <Modal
          isOpen={isGameHistoryModalOpen}
          onEscapeKeydown={closeHistoryModal}
          onBackgroundClick={closeHistoryModal}
          allowScroll
        >
          <ModalContentWrapper>
            <h1>Game History</h1>
            <GameRecords
              data={gameHistory}
              onClickRecord={viewSelectedGameRecord}
            />

            <Button onClick={closeHistoryModal}>Close</Button>
            <Button
              onClick={() => {
                resetGame()
                clearGameHistory()
              }}
              variant="outlined"
            >
              Clear History
            </Button>
          </ModalContentWrapper>
        </Modal>
      )}
    </Container>
  )
}

export default TicTacToe
