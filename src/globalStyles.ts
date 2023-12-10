import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body, #root {
    position: relative;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    color: #333;
    background: #F4F2F0;
  }
  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
