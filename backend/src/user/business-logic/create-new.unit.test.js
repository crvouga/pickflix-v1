const makeUser = require("../__test__/user");
const userDb = require("../__test__/user-db.mock");
const buildCreateNew = require("./create-new");
const buildGetByForeignIds = require("./get-by-foreign-ids");

const getByForeignIds = buildGetByForeignIds({ userDb });
const createNew = buildCreateNew({
  getByForeignIds,
  userDb,
});

describe("create new user", () => {
  it("rejects when missing ids", async () => {
    const foreignIds = {};
    expect(createNew({ foreignIds })).rejects.toBeTruthy();
  });

  it("rejects when invalid ids", async () => {
    const foreignIds = { firebaseId: 42 };
    expect(createNew({ foreignIds })).rejects.toBeTruthy();
  });

  it("rejects when id collision", async () => {
    const user = makeUser();
    await userDb.insert(user);
    expect(createNew({ foreignIds: user.foreignIds })).rejects.toBeTruthy();
  });

  it("creates user with same foreignIds", async () => {
    const foreignIds = makeUser().foreignIds;
    const created = await createNew({ foreignIds });
    expect(created.foreignIds).toStrictEqual(foreignIds);
  });
});
