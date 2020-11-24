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
    <ThemeProvider>
      <ReduxProvider>
        <HistoryProvider>
          <QueryProvider>
            <TmdbConfigurationGate loading={<AppLoadingPage />}>
              {children}
            </TmdbConfigurationGate>
          </QueryProvider>
        </HistoryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};
