import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingPage from "../../common/page/LoadingPage";
import { configureReduxStore } from "../redux/configure-redux-store";

const { store, persistor } = configureReduxStore();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
