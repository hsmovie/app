import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nanum Gothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-sommthing: grayscale;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
