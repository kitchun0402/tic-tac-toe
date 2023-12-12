import { act, renderHook } from '@testing-library/react'
import { LocalStorageKey } from '../configs/localStorage'
import { type GameStates } from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'
import { generateEmptyTiles } from '../utils/ticTacToe'
import useGameHistory from './useGameHistory'

const mockGameHistory: GameStates = {
  id: 'hello world',
  gameResult: null,
  mode: 'PvC',
  playerTurn: PlayerLabel.X,
  tiles: generateEmptyTiles(3),
}
describe('useGameHistory', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with an empty game history', () => {
    const { result } = renderHook(() => useGameHistory())
    expect(result.current.gameHistory).toEqual([])
  })

  it('should update game history with a new game state', () => {
    const { result } = renderHook(() => useGameHistory())

    act(() => {
      result.current.updateGameHistory(mockGameHistory)
    })

    expect(result.current.gameHistory).toHaveLength(1)
    expect(
      localStorage.getItem(LocalStorageKey.TIC_TAC_TOE_HISTORY),
    ).not.toBeNull()
  })

  it('should not add duplicate game states to the history', () => {
    const { result } = renderHook(() => useGameHistory())
    act(() => {
      result.current.updateGameHistory(mockGameHistory)
    })
    act(() => {
      result.current.updateGameHistory(mockGameHistory)
    })
    expect(result.current.gameHistory).toHaveLength(1)
  })
  it('should clear the game history', () => {
    const { result } = renderHook(() => useGameHistory())

    act(() => {
      result.current.updateGameHistory(mockGameHistory)
      result.current.clearGameHistory()
    })

    expect(result.current.gameHistory).toEqual([])
  })
})
