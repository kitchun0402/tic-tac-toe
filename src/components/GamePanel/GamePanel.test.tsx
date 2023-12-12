import { fireEvent, render, screen } from '@testing-library/react'
import GamePanel from './GamePanel'

describe('GamePanel', () => {
  it('calls onClickReset, onClickMode, and onClickHistory handlers when buttons are clicked', () => {
    const mockOnClickReset = jest.fn()
    const mockOnClickMode = jest.fn()
    const mockOnClickHistory = jest.fn()
    render(
      <GamePanel
        onClickReset={mockOnClickReset}
        onClickMode={mockOnClickMode}
        onClickHistory={mockOnClickHistory}
      />,
    )

    const resetButton = screen.getByTestId('reset-button')
    const modeButton = screen.getByTestId('mode-button')
    const historyButton = screen.getByTestId('history-button')

    fireEvent.click(resetButton)
    fireEvent.click(modeButton)
    fireEvent.click(historyButton)

    expect(mockOnClickReset).toBeCalledTimes(1)
    expect(mockOnClickMode).toBeCalledTimes(1)
    expect(mockOnClickHistory).toBeCalledTimes(1)
  })
})
