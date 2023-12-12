import { fireEvent, render, screen } from '@testing-library/react'
import { type GameHistory } from '../../types/gameStates'
import PlayerLabel from '../../types/playerLabel'
import { generateEmptyTiles } from '../../utils/ticTacToe'
import GameRecords from './GameRecords'

const mockData: GameHistory = [
  {
    id: '1',
    mode: 'PvP',
    date: '2023-01-01',
    gameResult: PlayerLabel.X,
    playerTurn: PlayerLabel.X,
    tiles: generateEmptyTiles(3),
  },
  {
    id: '2',
    mode: 'PvC',
    date: '2023-01-02',
    gameResult: PlayerLabel.O,
    playerTurn: PlayerLabel.O,
    tiles: generateEmptyTiles(3),
  },
]

describe('GameRecords', () => {
  it('renders records correctly', () => {
    const onClickRecord = jest.fn()
    render(<GameRecords data={mockData} onClickRecord={onClickRecord} />)

    // Check if the records are rendered
    expect(screen.getByText('Mode: PvP')).toBeInTheDocument()
    expect(screen.getByText('Mode: PvC')).toBeInTheDocument()
    const viewButtons = screen.getAllByText('View')
    expect(viewButtons).toHaveLength(2)

    const firstViewButton = viewButtons[0]
    fireEvent.click(firstViewButton)
    expect(onClickRecord).toHaveBeenCalledWith(mockData[0])
  })

  it('renders a record for the win of "X" correctly', () => {
    const onClickRecord = jest.fn()
    render(
      <GameRecords
        data={[
          {
            id: '1',
            mode: 'PvP',
            date: '2023-01-01',
            gameResult: PlayerLabel.X,
            playerTurn: PlayerLabel.X,
            tiles: generateEmptyTiles(3),
          },
        ]}
        onClickRecord={onClickRecord}
      />,
    )

    expect(screen.getByText('X won')).toBeInTheDocument()
  })

  it('renders a record for DRAW correctly', () => {
    const onClickRecord = jest.fn()
    render(
      <GameRecords
        data={[
          {
            id: '3',
            mode: 'PvC',
            date: '2023-01-02',
            gameResult: 'DRAW',
            playerTurn: PlayerLabel.O,
            tiles: generateEmptyTiles(3),
          },
        ]}
        onClickRecord={onClickRecord}
      />,
    )

    expect(screen.getByText('Tied')).toBeInTheDocument()
  })

  it('renders empty container with no records', () => {
    const onClickRecord = jest.fn()
    render(<GameRecords data={[]} onClickRecord={onClickRecord} />)

    expect(screen.queryAllByText('View')).toEqual([])
  })
})
