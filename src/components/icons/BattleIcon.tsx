import battleIcon from '../../assets/icons/battle-white-icon.svg'
type Props = {
  size?: number
}

function BattleIcon({ size = 24 }: Props) {
  return <img src={battleIcon} width={size} />
}

export default BattleIcon
