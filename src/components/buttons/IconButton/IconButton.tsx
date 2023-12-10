import { Container } from './IconButton.elements'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function IconButton({ children, ...restProps }: Props) {
  return <Container {...restProps}>{children}</Container>
}

export default IconButton
