const MAX_LENGTH = 20;

export type TodoItem = {
  readonly id: string;
  readonly userId: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export default ({
  makeId,
  isValidId,
}: {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}) => (todoInfo: Partial<TodoItem>): TodoItem => {
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
