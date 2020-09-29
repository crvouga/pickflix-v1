import { ThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxQueryProvider } from "redux-query-react";
import configureStore from "../redux/configureStore";
import attachFastClick from "./attachFastClick";
import configureTheme from "./configureTheme";
import { selectors } from "../redux";

attachFastClick();

const theme = configureTheme();

const { store, persistor, history } = configureStore();

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReduxQueryProvider queriesSelector={selectors.query.queries}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ConnectedRouter>
        </ReduxQueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
