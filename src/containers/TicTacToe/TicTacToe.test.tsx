import { render, screen } from '@testing-library/react'
import TicTacToe from './TicTacToe'
jest.mock('../../hooks/useGameStates', () => ({
  __esModule: true,
  default: () => ({
    currentGameStates: {
      playerTurn: 'X',
      tiles: Array(9).fill(null),
      gameResult: null,
      mode: 'PvP',
    },
  }),
}))

describe('TicTacToe', () => {
  it('renders TicTacToe component', () => {
    render(<TicTacToe />)
    expect(screen.getByText('PvP mode')).toBeInTheDocument()
    expect(screen.getByText('X turn')).toBeInTheDocument()
  })
})
