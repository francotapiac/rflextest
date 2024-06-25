import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import './index.css'
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux";
import store from './redux/store';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2333", // Color primario más oscuro
      light: "#586185", // Color primario más claro
    },
    secondary: {
      main: "#f68b00", // Color secundario
      light: "#ffac33", // Color secundario más claro
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
