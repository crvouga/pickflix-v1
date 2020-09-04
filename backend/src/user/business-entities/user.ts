export type User = {
  id: string;
  firebaseId: string;
};

type Build = (dependencies: {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}) => (_: Partial<User>) => User;

export const buildMakeUser: Build = ({makeId, isValidId}) => (
  userInfo
): User => {
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
