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
  const [isClearingHistory, setIsClearingHistory] = useState(false)
  const updateGameHistory = useCallback(
    (currentGameStates: GameStates) => {
      /**
       * when current game is over but the user wants to clear the history,
       * it will keep adding the result to the history.
       * Therefore, requires isClearingHistory to ensure the entire history is clear.
       */
      if (isClearingHistory) return
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

      setIsClearingHistory(false)
    },
    [gameHistory, isClearingHistory],
  )

  const clearGameHistory = () => {
    setIsClearingHistory(true)
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
