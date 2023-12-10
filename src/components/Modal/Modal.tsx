import { type ModalProps } from 'styled-react-modal'
import { StyledModal } from './Modal.elements'

type Props = ModalProps

function Modal({ children, ...restProps }: Props) {
  return <StyledModal {...restProps}>{children}</StyledModal>
}

export default Modal
