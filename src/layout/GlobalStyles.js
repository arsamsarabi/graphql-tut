import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Arvo|Rajdhani&display=swap');

  body, html {
    margin: 0;
    padding: 0;
    font-family: 'Arvo', Verdana, Geneva, sans-serif;
    background-color: var(--blue-grey);
    height: 100%;
  }

  #root {
    height: 100%;
  }

  button {
    border: 0;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
  }
`;
