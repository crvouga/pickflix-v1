import {buildExpressApp} from './build';
import {dependenciesFake} from './dependencies.fake';

export const makeExpressAppFake = () => {
  const {app} = buildExpressApp(dependenciesFake);
  return {
    ...dependenciesFake,
    app,
  };
};
