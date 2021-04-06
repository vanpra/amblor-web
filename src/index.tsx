import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: purple[500],
    },
  },
  shape: {
    borderRadius: 4,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
