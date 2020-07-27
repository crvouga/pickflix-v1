import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ParallaxProvider } from "react-scroll-parallax";
import { PersistGate } from "redux-persist/integration/react";
import attachFastClick from "./attachFastClick";
import configureFirebase from "./configureFirebase";
import configureStore from "./configureStore";
import configureTheme from "./configureTheme";
import SnackbarProvider from "./SnackbarProvider";
import { ReactQueryDevtoolsPanel } from "react-query-devtools";

attachFastClick();

const theme = configureTheme();
const { store, persistor, history } = configureStore();
const rrfProps = configureFirebase(store);

export default ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <ThemeProvider theme={theme}>
              <ParallaxProvider>
                <SnackbarProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {children}
                  </MuiPickersUtilsProvider>
                </SnackbarProvider>
              </ParallaxProvider>
            </ThemeProvider>
          </ReactReduxFirebaseProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
