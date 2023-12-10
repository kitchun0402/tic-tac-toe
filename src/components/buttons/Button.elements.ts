import styled, { css } from 'styled-components'

type ButtonProps = {
  $variant?: 'filled' | 'outlined'
}
export const StyledButton = styled.button<ButtonProps>`
  ${({ $variant }) => css`
    border: none;
    background: none;
    padding: 0.5em 0.75em;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    color: #fff;
    width: 100%;
    transition: filter 0.1s ease-in-out;

    ${$variant === 'filled' &&
    css`
      background-color: #e33b6d;
    `}

    ${$variant === 'outlined' &&
    css`
      border: 1px solid #e33b6d;
      transition: background-color 0.1s ease-in-out;
      &:hover {
        background-color: #e33b6d;
      }
    `}
    &:hover {
      filter: brightness(1.1);
    }
  `}
`
