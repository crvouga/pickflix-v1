const makeUser = require("../__test__/user");
const userDb = require("../__test__/user-db.mock");
const buildCreateNew = require("./create-new");
const buildGetByForeignIds = require("./get-by-foreign-ids");
const buildGetElseCreateNew = require("./get-else-create-new");

const getByForeignIds = buildGetByForeignIds({ userDb });
const createNew = buildCreateNew({ getByForeignIds, userDb });
const getElseCreateNew = buildGetElseCreateNew({
  createNew,
  getByForeignIds,
});

describe("get by foreignIds else create new", () => {
  it("creates new user with provided foreignIds if no existing user", async () => {
    const foreignIds = makeUser().foreignIds;
    const result = await getElseCreateNew({ foreignIds });
    const found = await getByForeignIds({ foreignIds });
    expect(result).toStrictEqual(found);
  });

  it("returns existing user", async () => {
    const created = await createNew({ foreignIds: makeUser().foreignIds });
    const result = await getElseCreateNew({
      foreignIds: created.foreignIds,
    });
    expect(result).toStrictEqual(created);
  });
});
