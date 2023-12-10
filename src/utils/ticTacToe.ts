import { type GameResult, type Tile } from '../types/gameStates'
import type PlayerLabel from '../types/playerLabel'

export const checkGameResult = (
  tiles: Array<PlayerLabel | null>,
): GameResult => {
  const winningCombinations = [
    // columns
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const combination of winningCombinations) {
    const firstPlayerLabel = tiles[combination[0]]
    const secondPlayerLabel = tiles[combination[1]]
    const thirdPlayerLabel = tiles[combination[2]]
    if (
      firstPlayerLabel &&
      firstPlayerLabel === secondPlayerLabel &&
      firstPlayerLabel === thirdPlayerLabel
    ) {
      return firstPlayerLabel
    }
  }
  if (checkIfAllTilesFilled(tiles)) {
    return 'DRAW'
  }
  return null
}

export const checkIfAllTilesFilled = (tiles: Array<PlayerLabel | null>) => {
  return tiles.every((tile) => tile)
}

export const generateEmptyTiles = () => {
  return Array<Tile>(9).fill(null)
}
