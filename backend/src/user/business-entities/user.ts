export type User = {
  readonly id: string;
  readonly firebaseId: string;
};

type Dependencies = {
  makeId: () => string;
  isValidId: (id: string) => boolean;
};

type Build = (_: Dependencies) => (_: Partial<User>) => User;

const build: Build = ({makeId, isValidId}) => (userInfo): User => {
  const {id = makeId(), firebaseId} = userInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id: ' + id);
  }

  if (!firebaseId) {
    throw new Error('firebaseId is required');
  }

  return Object.freeze({
    id,
    firebaseId,
  });
};

export default build;
