import {buildExpressApp} from './build';
import {dependencies} from './dependencies';

export const makeExpressApp = () => {
  const {app} = buildExpressApp(dependencies);
  return app;
};
