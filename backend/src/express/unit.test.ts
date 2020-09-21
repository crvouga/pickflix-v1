import {makeExpressAppFake} from './fake';

import {makeExpressApp} from '.';

describe('express app', () => {
  it('builds fake without crashing', () => {
    expect(makeExpressAppFake).not.toThrow();
  });

  it('builds without crashing', () => {
    expect(makeExpressApp).not.toThrow();
  });
});
