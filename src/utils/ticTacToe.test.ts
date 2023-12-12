import { type Tiles } from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'
import {
  checkGameResult,
  checkIfAllTilesFilled,
  generateEmptyTiles,
  getNextPlayerTurn,
} from './ticTacToe'

describe('checkGameResult', () => {
  it('should return null for an ongoing game', () => {
    const tiles = [
      null,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      null,
      null,
      null,
      null,
    ]
    const result = checkGameResult(tiles)
    expect(result).toBeNull()
  })

  it('should return the winning player label for a 1st row winning combination', () => {
    const tiles = [
      PlayerLabel.X,
      PlayerLabel.X,
      PlayerLabel.X,
      null,
      PlayerLabel.O,
      null,
      null,
      null,
      PlayerLabel.O,
    ]
    const result = checkGameResult(tiles)
    expect(result).toBe(PlayerLabel.X)
  })
  it('should return the winning player label for a 1st column winning combination', () => {
    const tiles = [
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.X,
      PlayerLabel.O,
      null,
      PlayerLabel.X,
      null,
      PlayerLabel.O,
    ]
    const result = checkGameResult(tiles)
    expect(result).toBe(PlayerLabel.X)
  })
  it('should return the winning player label for a diagonal winning combination', () => {
    const tiles = [
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.O,
      null,
      PlayerLabel.X,
      null,
      PlayerLabel.O,
    ]
    const result = checkGameResult(tiles)
    expect(result).toBe(PlayerLabel.O)
  })
  it('should return "DRAW" for a draw game', () => {
    const tiles = [
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
    ]
    const result = checkGameResult(tiles)
    expect(result).toBe('DRAW')
  })
})

describe('checkIfAllTilesFilled', () => {
  it('should return true when all tiles are filled', () => {
    const tiles = [
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
    ]
    const result = checkIfAllTilesFilled(tiles)
    expect(result).toBe(true)
  })

  it('should return false when at least one tile is empty', () => {
    const tiles = [
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      null,
      PlayerLabel.O,
      PlayerLabel.X,
      PlayerLabel.O,
      PlayerLabel.X,
    ] as Tiles
    const result = checkIfAllTilesFilled(tiles)
    expect(result).toBe(false)
  })

  it('should return false for an empty board', () => {
    const tiles = Array(9).fill(null)
    const result = checkIfAllTilesFilled(tiles)
    expect(result).toBe(false)
  })
})

describe('generateEmptyTiles', () => {
  it('generates an array of empty tiles for a 3x3 board by default', () => {
    const result = generateEmptyTiles()
    const expected = [null, null, null, null, null, null, null, null, null] // Assuming a 3x3 board
    expect(result).toEqual(expected)
  })

  it('generates an array of empty tiles for a 5x5 board', () => {
    const result = generateEmptyTiles(5)
    const expected = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]
    expect(result).toEqual(expected)
  })
})

describe('getNextPlayerTurn', () => {
  it('should toggle player turn from O to X', () => {
    const result = getNextPlayerTurn(PlayerLabel.O)
    expect(result).toBe('X')
  })

  it('should toggle player turn from X to O', () => {
    const result = getNextPlayerTurn(PlayerLabel.X)
    expect(result).toBe('O')
  })
})
