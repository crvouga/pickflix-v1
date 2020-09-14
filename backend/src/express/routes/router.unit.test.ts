import {makeApiRouter} from './router';

describe('api router', () => {
  it('makes router without throwing', () => {
    expect(() => makeApiRouter()).not.toThrow();
  });
});
