import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GlobalStyles } from "./layout/GlobalStyles";
import { Palette } from "./layout/Palette";

ReactDOM.render(
  <>
    <Palette />
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("root")
);
