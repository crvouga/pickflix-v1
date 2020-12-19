import React from "react";
import TmdbConfigurationGate from "../../media/tmdb/TmdbConfigurationGate";

import HistoryProvider from "./HistoryProvider";
import QueryProvider from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";
import LoadingPage from "../../common/page/LoadingPage";

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <HistoryProvider>
      <ThemeProvider>
        <ReduxProvider>
          <QueryProvider>
            <TmdbConfigurationGate loading={<LoadingPage />}>
              {children}
            </TmdbConfigurationGate>
          </QueryProvider>
        </ReduxProvider>
      </ThemeProvider>
    </HistoryProvider>
  );
};
