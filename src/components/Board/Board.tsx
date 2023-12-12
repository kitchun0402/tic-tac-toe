import { type Tiles } from '../../types/gameStates'
import Tile from '../Tile/Tile'
import { Container } from './Board.elements'

type Props = {
  tiles: Tiles
  onTileClick: (index: number) => void
}

function Board({ tiles, onTileClick }: Props) {
  return (
    <Container>
      {Array(9)
        .fill(0)
        .map((_, index) => {
          return (
            <Tile
              data-testid={`tile-${index}`}
              key={index}
              label={tiles[index]}
              onClick={() => onTileClick(index)}
            />
          )
        })}
    </Container>
  )
}

export default Board
