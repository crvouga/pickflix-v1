import React from "react";
import TmdbConfigurationGate from "../../media/tmdb/TmdbConfigurationGate";
import AppLoadingPage from "../AppLoadingPage";
import HistoryProvider from "./HistoryProvider";
import QueryProvider from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <HistoryProvider>
          <QueryProvider>
            <TmdbConfigurationGate loading={<AppLoadingPage />}>
              {children}
            </TmdbConfigurationGate>
          </QueryProvider>
        </HistoryProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};
