import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { ReactQueryCacheProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "../navigation/history";
import { queryCache } from "../query/query-cache";
import { configureReduxStore } from "../redux/configure-redux-store";
import { theme } from "./theme";

const { store, persistor } = configureReduxStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ReactQueryCacheProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};
