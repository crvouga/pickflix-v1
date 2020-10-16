import React from "react";
import { ReactQueryCacheProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "../navigation/history";
import { queryCache } from "../query/query-cache";
import { configureReduxStore } from "../redux/configure-redux-store";
import AppLoadingPage from "./AppLoadingPage";
import ThemeProvider from "./ThemeProvider";

const { store, persistor } = configureReduxStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <PersistGate loading={<AppLoadingPage />} persistor={persistor}>
              {children}
            </PersistGate>
          </ReactQueryCacheProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
