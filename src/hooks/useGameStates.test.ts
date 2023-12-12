import { act, renderHook } from '@testing-library/react'
import uuidModule from 'uuid'
import { COMPUTER_ACTION_DELAY_IN_MS } from '../configs/gameStates'
import { LocalStorageKey } from '../configs/localStorage'
import { type GameStates } from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'
import useGameStates from './useGameStates'

jest.mock('uuid', () => ({ v4: jest.fn(() => 'mocked-uuid') }))
jest.useFakeTimers()

describe('useGameStates', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with the correct initial states', () => {
    const { result } = renderHook(() => useGameStates())
    const expectedInitialState = {
      id: 'mocked-uuid',
      tiles: Array(9).fill(null),
      playerTurn: 'X',
      gameResult: null,
      mode: null,
    }

    expect(result.current.currentGameStates).toEqual(expectedInitialState)
  })

  it('should update game states when a tile is clicked', () => {
    const { result } = renderHook(() => useGameStates())

    act(() => {
      result.current.handleTileClick(0)
    })

    expect(result.current.currentGameStates.tiles[0]).toBe('X')
    const gameStates = localStorage.getItem(
      LocalStorageKey.TIC_TAC_TOE_CURRENT_GAME_STATES,
    )
    expect(gameStates).not.toBeNull()
    if (gameStates) {
      const parsedGameStates = JSON.parse(gameStates) as GameStates
      expect(parsedGameStates.tiles[0]).toBe('X')
    }
  })

  it('should not update game states if a clicked tile is already filled', () => {
    const { result } = renderHook(() => useGameStates())

    act(() => {
      result.current.handleTileClick(0)
    })

    act(() => {
      result.current.handleTileClick(0)
    })

    expect(result.current.currentGameStates.tiles[0]).toBe('X')
  })

  it('should reset the game states', () => {
    const { result } = renderHook(() => useGameStates())
    const newUuidAfterReset = 'mocked-uuid-after-reset'
    jest.spyOn(uuidModule, 'v4').mockReturnValue(newUuidAfterReset)
    act(() => {
      result.current.handleTileClick(0)
      result.current.resetGame()
    })
    const expectedInitialState = {
      id: newUuidAfterReset,
      tiles: Array(9).fill(null),
      playerTurn: 'X',
      gameResult: null,
      mode: null,
    }

    expect(result.current.currentGameStates).toEqual(expectedInitialState)
  })

  it('should update the game mode', () => {
    const { result } = renderHook(() => useGameStates())
    act(() => {
      result.current.updateGameMode('PvP')
    })
    expect(result.current.currentGameStates.mode).toBe('PvP')
  })

  it('should get a random move for the computer on PvC mode', () => {
    const { result } = renderHook(() => useGameStates())
    const { updateCurrentGameStates, handleTileClick } = result.current

    // return 0 index for the computer's next move
    const mockMathRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0)

    act(() => {
      updateCurrentGameStates(() => ({
        id: 'mocked-uuid',
        tiles: Array(9).fill(null),
        playerTurn: PlayerLabel.X,
        gameResult: null,
        mode: 'PvC',
      }))
      handleTileClick(1)
    })

    act(() => {
      jest.advanceTimersByTime(COMPUTER_ACTION_DELAY_IN_MS)
    })

    expect(result.current.currentGameStates.tiles[0]).toBe('O')
    mockMathRandom.mockRestore()
  })
})
