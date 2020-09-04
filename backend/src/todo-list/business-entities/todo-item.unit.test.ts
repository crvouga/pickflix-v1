import {makeTodoItem} from '.';

const longText = new Array(500).fill('a').join('');

describe('make todo item entity', () => {
  it('throw if userId is invalid', () => {
    expect(() => makeTodoItem({userId: '42', text: 'lorem'})).toThrow();
  });

  it('throw if userId is invalid', () => {
    expect(() => makeTodoItem({userId: '42', text: 'lorem'})).toThrow();
  });

  it('throw if userId is undefined', () => {
    expect(() => makeTodoItem({userId: undefined, text: 'lorem'})).toThrow();
  });

  it('throw if invalid id', () => {
    expect(() => makeTodoItem({id: '42'})).toThrow();
  });

  it('throw if text is empty', () => {
    expect(() => makeTodoItem({text: ''})).toThrow();
  });
  it('throw if text is too long', () => {
    expect(() => makeTodoItem({text: longText})).toThrow();
  });
});
