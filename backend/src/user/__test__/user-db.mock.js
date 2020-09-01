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

const findByForeignIds = async ({ foreignIds }) => {
  return Array.from(map.values()).filter(
    (v) => v.foreignIds.firebaseId === foreignIds.firebaseId
  )[0];
};

const remove = async ({ id }) => {
  map.delete(id);
  return true;
};

const __clear = async () => {
  map.clear();
};
module.exports = {
  __clear,
  insert,
  findAll,
  findById,
  findByForeignIds,
  remove,
};
