import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import TmdbConfigurationGate from "../media/tmdb/TmdbConfigurationGate";
import AppLoadingPage from "./AppLoadingPage";
import QueryProvider from "./QueryProvider";
import { configureReduxStore } from "./redux/configure-redux-store";
import ThemeProvider from "./ThemeProvider";

const history = createBrowserHistory();

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
