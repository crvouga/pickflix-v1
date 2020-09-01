const buildUserDb = () => {
  const map = new Map();
  const insert = async (user) => {
    map.set(user.id, user);
    return user;
  };

  const findAll = async () => {
    return map.values();
  };

  const findById = async ({ id }) => {
    return map.get(id);
  };

  const findByCredentials = async ({ credentials }) => {
    return Array.from(map.values()).filter(
      (v) => v.credentials.firebaseId === credentials.firebaseId
    )[0];
  };

  const remove = async ({ id }) => {
    map.delete(id);
    return true;
  };

  return {
    insert,
    findAll,
    findById,
    findByCredentials,
    remove,
  };
};

module.exports = { buildUserDb };
