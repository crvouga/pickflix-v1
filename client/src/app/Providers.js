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
import configureStore from "./configureStore";
import configureTheme from "./configureTheme";
import configureFirebase from "./configureFirebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
attachFastClick();

const theme = configureTheme();
const { store, persistor } = configureStore();
const rrfProps = configureFirebase(store);

export default ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
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
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  );
};
