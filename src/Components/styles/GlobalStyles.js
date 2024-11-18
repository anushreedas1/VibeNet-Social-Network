import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";

const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: white; /* Default background color */
    font-family: "Sirin Stencil", sans-serif; /* Apply the Sirin Stencil font */
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
