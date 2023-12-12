import { type GameResult, type Tile, type Tiles } from '../types/gameStates'
import PlayerLabel from '../types/playerLabel'

/**
 * Checks the result of the Tic Tac Toe game based on the current state of the 3x3 board.
 *
 * @param {Tiles} tiles - An array representing the tiles on the board, where each element is either a player label or null.
 * @returns {GameResult} The result of the game, can be 'X', 'O', 'DRAW', or null if the game is still ongoing.
 */
export const checkGameResult = (
  tiles: Array<PlayerLabel | null>,
): GameResult => {
  const winningCombinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
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

/**
 * Checks if all tiles on the board are filled.
 *
 * @param {Tiles} tiles - An array representing the tiles on the board, where each element is either a player label or null.
 * @returns {boolean} True if all tiles are filled, false otherwise.
 */
export const checkIfAllTilesFilled = (tiles: Tiles): boolean => {
  return tiles.every((tile) => tile)
}

/**
 * Generates an array of empty tiles for a square board of the specified size.
 *
 * @param {number} [size=3] - The size of each side of the square board.
 * @returns {Tile[]} An array representing empty tiles.
 */
export const generateEmptyTiles = (size: number = 3): Tile[] => {
  return Array<Tile>(size * size).fill(null)
}

/**
 * Gets the next player's turn based on the current player's turn.
 *
 * @param {PlayerLabel} playerTurn - The current player's turn label.
 * @returns {PlayerLabel} The label of the next player's turn.
 */
export const getNextPlayerTurn = (playerTurn: PlayerLabel) => {
  let nextPlayerTurn = PlayerLabel.O
  // Toggle player turns between 'O' and 'X'
  if (playerTurn === PlayerLabel.O) {
    nextPlayerTurn = PlayerLabel.X
  }
  return nextPlayerTurn
}
