import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </ReactQueryCacheProvider>
  );
};
