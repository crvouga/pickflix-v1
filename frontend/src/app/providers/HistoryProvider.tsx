import { createBrowserHistory, Location } from "history";
import React from "react";
import { Router } from "react-router";
import { eventChannel } from "redux-saga";

export const history = createBrowserHistory();

export const historyEventChannel = eventChannel<Location>((emitter) => {
  const unlisten = history.listen((location) => {
    emitter(location);
  });
  return () => {
    unlisten();
  };
});

type Props = React.PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return <Router history={history}>{children}</Router>;
};
