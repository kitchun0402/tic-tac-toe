import IconButton from '../buttons/IconButton/IconButton'
import BattleIcon from '../icons/BattleIcon'
import HistoryIcon from '../icons/HistoryIcon'
import ResetIcon from '../icons/ResetIcon'
import { Container } from './GamePanel.elements'
type Props = {
  onClickReset: () => void
  onClickMode: () => void
  onClickHistory: () => void
} & React.HTMLAttributes<HTMLDivElement>

function GamePanel({
  onClickReset,
  onClickMode,
  onClickHistory,
  ...restProps
}: Props) {
  return (
    <Container {...restProps}>
      <IconButton data-testid="reset-button" onClick={onClickReset}>
        <ResetIcon />
      </IconButton>
      <IconButton data-testid="mode-button" onClick={onClickMode}>
        <BattleIcon />
      </IconButton>
      <IconButton data-testid="history-button" onClick={onClickHistory}>
        <HistoryIcon />
      </IconButton>
    </Container>
  )
}

export default GamePanel
