import {buildExpressAppFake} from './build.fake';

describe('express app', () => {
  it('builds fake without crashing', () => {
    expect(buildExpressAppFake).not.toThrow();
  });
});
