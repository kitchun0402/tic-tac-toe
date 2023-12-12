import { type GameHistory } from '../../types/gameStates'
import Button from '../buttons/Button'
import { Container, Record, RecordBody } from './GameRecords.elements'

type Props = {
  data: GameHistory
  onClickRecord: (record: GameHistory[0]) => void
}

function GameRecords({ data, onClickRecord }: Props) {
  return (
    <Container>
      {data.map((record) => {
        return (
          <Record key={record.id} onClick={() => onClickRecord(record)}>
            <p>Mode: {record.mode}</p>
            <p>{record.date}</p>
            <RecordBody>
              <h4>
                {record.gameResult === 'DRAW'
                  ? 'Tied'
                  : `${record.gameResult} won`}
              </h4>
              <Button variant="outlined">View</Button>
            </RecordBody>
          </Record>
        )
      })}
    </Container>
  )
}

export default GameRecords
