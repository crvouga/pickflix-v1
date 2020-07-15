import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { PersistGate } from "redux-persist/integration/react";
import attachFastClick from "./attachFastClick";
import configureStore from "../redux/configureStore";
import configureTheme from "./configureTheme";
attachFastClick();

const { store, persistor } = configureStore();
const theme = configureTheme();

export default ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ParallaxProvider>
              <SnackbarProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {children}
                </MuiPickersUtilsProvider>
              </SnackbarProvider>
            </ParallaxProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
