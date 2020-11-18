import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "../navigation/history";
import { configureReduxStore } from "../redux/configure-redux-store";
import TmdbConfigurationGate from "../tmdb/TmdbConfigurationGate";
import AppLoadingPage from "./AppLoadingPage";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

const { store, persistor } = configureReduxStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router history={history}>
          <QueryProvider>
            <PersistGate loading={<AppLoadingPage />} persistor={persistor}>
              <TmdbConfigurationGate loading={<AppLoadingPage />}>
                {children}
              </TmdbConfigurationGate>
            </PersistGate>
          </QueryProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
