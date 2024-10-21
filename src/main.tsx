import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StoreProvider } from "./store/index.tsx";
import store from "../src/redux/slice/index.ts";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
