import {makeExpressApp} from '.';
import {makeExpressAppFake} from './fake';

describe('express app', () => {
  it('builds fake without crashing', () => {
    expect(makeExpressAppFake).not.toThrow();
  });

  it('builds without crashing', () => {
    expect(makeExpressApp).not.toThrow();
  });
});
