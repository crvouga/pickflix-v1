const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildUserDb } = require("../data-access/user-db.mock");
const { buildCreateNew } = require("./create-new");
const { buildGetByCredentials } = require("./get-by-credentials");

const userDb = buildUserDb();
const getByCredentials = buildGetByCredentials({ userDb });
const createNew = buildCreateNew({
  getByCredentials,
  userDb,
});

describe("create new user", () => {
  it("rejects when missing credentials", async () => {
    const credentials = {};
    expect(createNew({ credentials })).rejects.toBeTruthy();
  });

  it("rejects when invalid credentials", async () => {
    const credentials = { firebaseId: 42 };
    expect(createNew({ credentials })).rejects.toBeTruthy();
  });

  it("rejects when credential collision", async () => {
    const fakeUser = makeFakeUser();
    await userDb.insert(fakeUser);
    expect(
      createNew({ credentials: fakeUser.credentials })
    ).rejects.toBeTruthy();
  });

  it("returns new user with passed in credentials", async () => {
    const fakeCredentials = makeFakeUser().credentials;
    const newUser = await createNew({ credentials: fakeCredentials });
    expect(newUser.credentials).toStrictEqual(fakeCredentials);
  });

  it("inserts new user into db", async () => {
    const fakeCredentials = makeFakeUser().credentials;
    const created = await createNew({ credentials: fakeCredentials });
    const found = await userDb.findByCredentials({
      credentials: fakeCredentials,
    });
    expect(found).toStrictEqual(created);
  });
});
