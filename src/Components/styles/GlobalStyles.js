import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: white; /* Default background color */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* Apply the system fonts */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    transition: background-color 0.3s ease; /* Smooth transition */
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`;

export default GlobalStyles;
