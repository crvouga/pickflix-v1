import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxQueryProvider } from "redux-query-react";
import { selectors } from "../redux";
import configureStore from "../redux/configureStore";
import SnackbarProvider from "../snackbar/SnackbarProvider";
import attachFastClick from "./attachFastClick";
import configureTheme from "./configureTheme";

attachFastClick();

const queriesSelector = (state) => state?.query?.queries;

const theme = configureTheme();

const { store, persistor, history } = configureStore();

export default ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReduxQueryProvider queriesSelector={queriesSelector}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
              <ParallaxProvider>
                <SnackbarProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {children}
                  </MuiPickersUtilsProvider>
                </SnackbarProvider>
              </ParallaxProvider>
            </ThemeProvider>
          </ConnectedRouter>
        </ReduxQueryProvider>
      </PersistGate>
    </Provider>
  );
};
