import { ThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxQueryProvider } from "redux-query-react";
import configureStore from "../redux/configureStore";
import SnackbarProvider from "../snackbar/Snackbar";
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
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ConnectedRouter>
        </ReduxQueryProvider>
      </PersistGate>
    </Provider>
  );
};
