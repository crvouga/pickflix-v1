import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppLoadingPage from "../AppLoadingPage";
import { configureReduxStore } from "../redux/configure-redux-store";

const { store, persistor } = configureReduxStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoadingPage />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
