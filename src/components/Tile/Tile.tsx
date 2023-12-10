import type PlayerLabel from '../../types/playerLabel'
import { Container } from './Tile.elements'

type Props = {
  label: PlayerLabel | null
}

function Tile({
  label,
  ...restProps
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container label={label} {...restProps}>
      {label}
    </Container>
  )
}

export default Tile
