const MAX_LENGTH = 20;

export type TodoItem = {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type MakeTodoItem = (todoInfo: Partial<TodoItem>) => TodoItem;

type Build = (dependencies: {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}) => MakeTodoItem;

export const buildMakeTodoItem: Build = ({makeId, isValidId}) => todoInfo => {
  const {
    id = makeId(),
    userId,
    text,
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  } = todoInfo || {};

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (!userId) {
    throw new Error('user id required');
  }

  if (!isValidId(userId)) {
    throw new Error('invalid user id');
  }

  if (typeof text !== 'string') {
    throw new Error('text must be a string');
  }

  if (text.length < 1) {
    throw new Error("text can't be empty");
  }

  if (text.length > MAX_LENGTH) {
    throw new Error(`text can't be more than ${MAX_LENGTH} characters long`);
  }

  return {
    id,
    userId,
    text,
    completed,
    createdAt,
    updatedAt,
  };
};
