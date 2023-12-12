import { fireEvent, render, screen } from '@testing-library/react'
import PlayerLabel from '../../types/playerLabel'
import Board from './Board'

describe('Board', () => {
  it('renders correctly with default tiles', () => {
    const mockOnTileClick = jest.fn()
    render(
      <Board
        tiles={[
          PlayerLabel.X,
          null,
          PlayerLabel.O,
          null,
          PlayerLabel.X,
          null,
          null,
          null,
          PlayerLabel.O,
        ]}
        onTileClick={mockOnTileClick}
      />,
    )

    const tileElements = screen.getAllByTestId(/tile-\d+/)
    expect(tileElements).toHaveLength(9)
    expect(tileElements[0]).toHaveTextContent(PlayerLabel.X)
    expect(tileElements[2]).toHaveTextContent(PlayerLabel.O)
    expect(tileElements[4]).toHaveTextContent(PlayerLabel.X)
    expect(tileElements[8]).toHaveTextContent(PlayerLabel.O)
  })

  it('calls onTileClick handler when a tile is clicked', () => {
    const mockOnTileClick = jest.fn()
    render(
      <Board
        tiles={[null, null, null, null, null, null, null, null, null]}
        onTileClick={mockOnTileClick}
      />,
    )

    const tileElement = screen.getByTestId('tile-1')
    fireEvent.click(tileElement)
    expect(mockOnTileClick).toHaveBeenCalledWith(1)
  })
})
