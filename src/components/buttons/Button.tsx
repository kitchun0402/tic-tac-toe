import React from 'react'
import { StyledButton } from './Button.elements'

type Props = {
  margin?: string
  variant?: 'filled' | 'outlined'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, margin, variant = 'filled', ...restProps }: Props) {
  return (
    <StyledButton style={{ margin }} $variant={variant} {...restProps}>
      {children}
    </StyledButton>
  )
}

export default Button
