import fc, {Arbitrary} from 'fast-check';
import {TodoItem} from '../todo-item';
import {makeTodoItem} from '..';
import {makeId} from '../../../id';

export const arbitraryText = fc.lorem().filter(text => text.length < 20);

export const arbitraryTodoItem = fc.record({
  id: fc.uuid(),
  userId: fc.uuid(),
  text: arbitraryText,
  completed: fc.boolean(),
  createdAt: fc.date(),
  updatedAt: fc.date(),
});

export const arbitraryTodoItemInfo: Arbitrary<Partial<TodoItem>> = fc.record({
  userId: fc.uuid(),
  text: arbitraryText,
});

export const makeArbitraryTodoItem = (
  overrides?: Partial<TodoItem>
): TodoItem => {
  return makeTodoItem({
    userId: makeId(),
    text: 'lorem lorem',
    ...overrides,
  });
};
