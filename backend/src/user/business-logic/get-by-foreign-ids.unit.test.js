const makeUser = require("../__test__/user");
const userDb = require("../__test__/user-db.mock");
const buildGetByForeignIds = require("./get-by-foreign-ids");

const getByForeignIds = buildGetByForeignIds({ userDb });

describe("get user by some credential", () => {
  it("returns user", async () => {
    const inserted = await userDb.insert(makeUser());
    const found = await getByForeignIds({
      foreignIds: inserted.foreignIds,
    });
    expect(found).toStrictEqual(inserted);
  });

  it("rejects when invalid credentials are provided", async () => {
    expect(
      getByForeignIds({
        foreignIds: { someId: "34567890" },
      })
    ).rejects.toBeTruthy();
  });
});
