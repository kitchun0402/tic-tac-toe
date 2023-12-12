import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { LocalStorageKey } from '../configs/localStorage'
import {
  type GameMode,
  type GameStates,
  type GameStatus,
} from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'
import {
  checkGameResult,
  generateEmptyTiles,
  getNextPlayerTurn,
} from '../utils/ticTacToe'
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
    mode: null,
  }
})()

function useGameStates() {
  const { gameHistory, updateGameHistory, clearGameHistory } = useGameHistory()
  const [gameStatus, setGameStatus] = useState<GameStatus>('Start')
  const [currentGameStates, setCurrentGameStates] =
    useState<GameStates>(initialStates)

  const updateCurrentGameStates = useCallback(
    (handler: (prev: GameStates) => GameStates) => {
      setCurrentGameStates((prev) => {
        const newGameStates = handler(prev)
        // preserve states in local storage
        updateLocalStorage(newGameStates)
        return newGameStates
      })
    },
    [],
  )

  const handleTileClick = useCallback(
    (index: number, isClickedByPlayer = true) => {
      setGameStatus('In Progress')
      const { gameResult, tiles, mode, playerTurn } = currentGameStates
      // if it's gameover, players are not allowed to click the remaining tiles
      if (gameResult) return

      // PvC mode: the solo player is not allowed to click a tile when it is the computer's turn
      const isComputerTurn = mode === 'PvC' && playerTurn === PlayerLabel.O
      if (isClickedByPlayer && isComputerTurn) return

      const isTileClick = tiles[index]
      if (isTileClick) {
        return
      }

      updateCurrentGameStates((prev) => {
        const newStates: GameStates = {
          ...prev,
        }
        newStates.tiles[index] = playerTurn
        const nextPlayerTurn = getNextPlayerTurn(playerTurn)
        newStates.playerTurn = nextPlayerTurn

        return newStates
      })
    },
    [currentGameStates, updateCurrentGameStates],
  )

  const resetGame = () => {
    updateCurrentGameStates((prev) => {
      return {
        ...prev,
        id: uuidv4(),
        tiles: generateEmptyTiles(),
        playerTurn: PlayerLabel.X,
        gameResult: null,
      }
    })
  }

  const updateGameMode = (mode: GameMode) => {
    updateCurrentGameStates((prev) => {
      return {
        ...prev,
        mode,
      }
    })
    resetGame()
  }

  const updateLocalStorage = (gameStates: GameStates) => {
    // preserve states in local storage
    localStorage.setItem(
      LocalStorageKey.TIC_TAC_TOE_CURRENT_GAME_STATES,
      JSON.stringify(gameStates),
    )
  }

  /**
   * Update Game States and History
   */
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
      updateCurrentGameStates(() => updatedGameStates)
    }
  }, [
    currentGameStates,
    gameStatus,
    updateCurrentGameStates,
    updateGameHistory,
  ])
  /**
   * Handle PvC logic
   */
  useEffect(() => {
    if (
      currentGameStates.mode === 'PvC' &&
      currentGameStates.playerTurn === PlayerLabel.O
    ) {
      const availableMoveIndice = []
      for (let index = 0; index < currentGameStates.tiles.length; index++) {
        // if a tile is null, it hasn't been filled
        if (!currentGameStates.tiles[index]) {
          availableMoveIndice.push(index)
        }
      }
      const randomIndex = Math.floor(Math.random() * availableMoveIndice.length)
      handleTileClick(availableMoveIndice[randomIndex], false)
    }
  }, [
    currentGameStates.mode,
    currentGameStates.playerTurn,
    currentGameStates.tiles,
    handleTileClick,
  ])
  return {
    gameHistory,
    currentGameStates,
    handleTileClick,
    resetGame,
    clearGameHistory,
    updateCurrentGameStates,
    updateGameMode,
  }
}

export default useGameStates
