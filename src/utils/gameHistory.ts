import { LocalStorageKey } from '../configs/localStorage'
import { type GameHistory } from '../types/gameStates'

export const getGameHistoryFromLocalStorage = () => {
  const gameHistory = localStorage.getItem(LocalStorageKey.TIC_TAC_TOE_HISTORY)
  if (gameHistory) {
    return JSON.parse(gameHistory) as GameHistory
  }
  return []
}
