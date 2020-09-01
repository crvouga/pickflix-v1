const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildUserDb } = require("../data-access/user-db.mock");
const { buildGetByCredentials } = require("./get-by-credentials");

const userDb = buildUserDb();
const getByCredentials = buildGetByCredentials({ userDb });

describe("get user by some credential", () => {
  it("returns user", async () => {
    const inserted = await userDb.insert(makeFakeUser());
    const found = await getByCredentials({ credentials: inserted.credentials });
    expect(found).toStrictEqual(inserted);
  });

  it("rejects when invalid credentials are provided", async () => {
    expect(
      getByCredentials({
        credentials: { someCredential: "123456789" },
      })
    ).rejects.toBeTruthy();
  });
});
