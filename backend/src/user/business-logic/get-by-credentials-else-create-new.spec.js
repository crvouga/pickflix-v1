const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildUserDb } = require("../data-access/user-db.mock");
const { buildCreateNew } = require("./create-new");
const { buildGetByCredentials } = require("./get-by-credentials");
const {
  buildGetByCredentialsElseCreateNew,
} = require("./get-by-credentials-else-create-new");

const userDb = buildUserDb();
const getByCredentials = buildGetByCredentials({ userDb });
const createNew = buildCreateNew({ getByCredentials, userDb });
const getByCredentialsElseCreateNew = buildGetByCredentialsElseCreateNew({
  createNew,
  getByCredentials,
});

describe("get by credentials else create new", () => {
  it("return a user", async () => {
    const credentials = makeFakeUser().credentials;
    const result = await getByCredentialsElseCreateNew({ credentials });
    expect(result).toBeTruthy();
    expect(result.credentials).toStrictEqual(credentials);
  });

  it("creates new user with provided credentials if no existing user", async () => {
    const credentials = makeFakeUser().credentials;
    const result = await getByCredentialsElseCreateNew({ credentials });
    const found = await userDb.findByCredentials({ credentials });
    expect(result).toStrictEqual(found);
  });

  it("returns existing user", async () => {
    const existing = makeFakeUser();
    await userDb.insert(existing);
    const result = await getByCredentialsElseCreateNew({
      credentials: existing.credentials,
    });
    expect(result).toStrictEqual(existing);
  });
});
