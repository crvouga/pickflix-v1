import { createBrowserHistory } from "history";
import React from "react";
import { Router } from "react-router";

export const history = createBrowserHistory();

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return <Router history={history}>{children}</Router>;
};
