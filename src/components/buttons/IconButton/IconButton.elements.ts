import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.8em;
  border-radius: 999px;
  text-transform: uppercase;
  background-color: #a4b5b8;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: filter 0.1s ease-in-out;
  &:hover {
    filter: brightness(1.1);
  }
`
