// styles/global-styles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  @media (prefers-color-scheme: dark) {
    // Dark mode styles
  }
`;
