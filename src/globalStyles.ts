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
  }
`
