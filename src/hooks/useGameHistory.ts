import { useCallback, useEffect, useState } from 'react'
import { LocalStorageKey } from '../configs/localStorage'
import { type GameHistory, type GameStates } from '../types/gameStates'

const initialGameHistory = () => {
  const gameHistory = localStorage.getItem(LocalStorageKey.TIC_TAC_TOE_HISTORY)
  if (gameHistory) {
    return JSON.parse(gameHistory) as GameHistory
  }
  return []
}
function useGameHistory() {
  const [gameHistory, setGameHistory] =
    useState<GameHistory>(initialGameHistory)
  const updateGameHistory = useCallback(
    (currentGameStates: GameStates) => {
      const isExisted = gameHistory.some(
        (record) => record.id === currentGameStates.id,
      )
      if (!isExisted) {
        setGameHistory((prev) => {
          const updatedHistory = [...prev]
          const recordDate = new Date()

          updatedHistory.unshift({
            ...currentGameStates,
            date: recordDate.toLocaleString(),
          })
          return updatedHistory
        })
      }
    },
    [gameHistory],
  )

  const clearGameHistory = () => {
    setGameHistory([])
  }
  useEffect(() => {
    localStorage.setItem(
      LocalStorageKey.TIC_TAC_TOE_HISTORY,
      JSON.stringify(gameHistory),
    )
  }, [gameHistory])
  return {
    gameHistory,
    updateGameHistory,
    clearGameHistory,
  }
}

export default useGameHistory
