import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const RecordBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Record = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: #354c6d;
  width: 100%;
  padding: 0.8em;
  gap: 4px;
  p {
    font-size: 0.8rem;
  }
  button {
    width: 60px;
    font-size: 12px;
    padding: 6px;
  }
`
