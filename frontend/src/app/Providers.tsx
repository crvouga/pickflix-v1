import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "../navigation/history";
import configureStore from "../redux/configureStore";
import attachFastClick from "./attachFastClick";
import configureTheme from "./configureTheme";

attachFastClick();

const theme = configureTheme();

const { store, persistor } = configureStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};
