import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import configureStore from "./configureStore";
import configureTheme from "./configureTheme";
import attachFastClick from "./attachFastClick";
attachFastClick();

const store = configureStore();
const theme = configureTheme();

export default ({ children }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
