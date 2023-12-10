import styled, { css } from 'styled-components'
import type PlayerLabel from '../../types/playerLabel'
type ContainerProps = {
  label: PlayerLabel | null
}
export const Container = styled.div<ContainerProps>`
  ${({ label }) => css`
    background: #223541;
    color: #ffffff;
    width: 1.2em;
    height: 1.2em;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    color: ${label === 'O' ? '#0ef88f' : '#F8AA0E'};
    user-select: none;
    cursor: pointer;
  `}
`
