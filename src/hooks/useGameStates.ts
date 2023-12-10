import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { LocalStorageKey } from '../configs/localStorage'
import { type GameStates, type GameStatus } from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'
import { checkGameResult, generateEmptyTiles } from '../utils/ticTacToe'
import useGameHistory from './useGameHistory'

/** @todo can change to Context if needed */
const initialStates = ((): GameStates => {
  const currentStates = localStorage.getItem(
    LocalStorageKey.TIC_TAC_TOE_CURRENT_GAME_STATES,
  )
  if (currentStates) {
    return JSON.parse(currentStates) as GameStates
  }
  return {
    id: uuidv4(),
    tiles: generateEmptyTiles(),
    playerTurn: PlayerLabel.X,
    gameResult: null,
  }
})()

function useGameStates() {
  const { gameHistory, updateGameHistory, clearGameHistory } = useGameHistory()
  const [gameStatus, setGameStatus] = useState<GameStatus>('Start')
  const [currentGameStates, setCurrentGameStates] =
    useState<GameStates>(initialStates)

  const togglePlayerTurn = () => {
    const { playerTurn } = currentGameStates
    let nextPlayerTurn = PlayerLabel.O
    if (playerTurn === PlayerLabel.O) {
      nextPlayerTurn = PlayerLabel.X
    }
    setCurrentGameStates((prev) => {
      return {
        ...prev,
        playerTurn: nextPlayerTurn,
      }
    })
  }

  const handleTileClick = (index: number) => {
    setGameStatus('In Progress')
    const { gameResult, tiles } = currentGameStates
    // if it's gameover, players are not allowed to click the remaining tiles
    if (gameResult) return

    const isTileClick = tiles[index]
    if (isTileClick) {
      return
    }
    setCurrentGameStates((prev) => {
      const newStates = { ...prev }
      newStates.tiles[index] = newStates.playerTurn
      return newStates
    })

    togglePlayerTurn()
  }

  const resetGame = () => {
    setCurrentGameStates({
      id: uuidv4(),
      tiles: generateEmptyTiles(),
      playerTurn: PlayerLabel.X,
      gameResult: null,
    })
  }

  const updateCurrentGameStates = (newGameStates: GameStates) => {
    setCurrentGameStates(newGameStates)
  }
  useEffect(() => {
    // won't update the states on first load
    if (gameStatus === 'Start') return
    // check winner
    const updatedGameResult = checkGameResult(currentGameStates.tiles)
    const updatedGameStates: GameStates = {
      ...currentGameStates,
      gameResult: updatedGameResult,
    }
    // if the game is over, update the history
    if (updatedGameStates.gameResult) {
      updateGameHistory(updatedGameStates)
    }

    // only update the game states when the game result is changed
    if (currentGameStates.gameResult !== updatedGameStates.gameResult) {
      setCurrentGameStates(updatedGameStates)
    }

    // preserve states in local storage
    localStorage.setItem(
      LocalStorageKey.TIC_TAC_TOE_CURRENT_GAME_STATES,
      JSON.stringify(updatedGameStates),
    )
  }, [currentGameStates, gameStatus, updateGameHistory])

  return {
    gameHistory,
    currentGameStates,
    handleTileClick,
    resetGame,
    clearGameHistory,
    updateCurrentGameStates,
  }
}

export default useGameStates
