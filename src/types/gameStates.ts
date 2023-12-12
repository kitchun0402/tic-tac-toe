import type PlayerLabel from './playerLabel'

export type GameMode = 'PvP' | 'PvC' | null
export type Tile = PlayerLabel | null

export type Tiles = Tile[]

export type GameResult = PlayerLabel | 'DRAW' | null

export type GameStates = {
  id: string
  tiles: Tiles
  gameResult: GameResult
  playerTurn: PlayerLabel
  mode: GameMode
}

export type GameHistory = Array<GameStates & { date: string }>

export type GameStatus = 'Start' | 'In Progress'
