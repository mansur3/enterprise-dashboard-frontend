import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/globalStyles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <GlobalStyles />
      <App />
    </StyleSheetManager>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
