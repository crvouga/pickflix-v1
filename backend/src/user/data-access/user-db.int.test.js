const { makeDb } = require("../../infrastructure/postgres/makeDb");
const makeUser = require("../__test__/user");
const buildUserDb = require("./user-db");

const userDb = buildUserDb({ makeDb });

describe("user db", () => {
  it("inserts a user and returns the same user", async () => {
    const user = makeUser();
    const response = await userDb.insert(user);
    expect(user).toStrictEqual(response);
  });

  it("list users", async () => {
    const inserts = await Promise.all(
      [makeUser(), makeUser(), makeUser()].map(userDb.insert)
    );
    const found = await userDb.findAll();
    inserts.forEach((insert) => {
      expect(found).toContainEqual(insert);
    });
  });

  it("finds user by id", async () => {
    const inserted = await userDb.insert(makeUser());
    const found = await userDb.findById({ id: inserted.id });
    expect(found).toStrictEqual(inserted);
  });

  it("finds user by foreignIds", async () => {
    const inserted = await userDb.insert(makeUser());
    const found = await userDb.findByForeignIds({
      foreignIds: inserted.foreignIds,
    });
    expect(found).toStrictEqual(inserted);
  });

  it("removes user", async () => {
    const inserted = await userDb.insert(makeUser());
    const before = await userDb.findById({ id: inserted.id });
    await userDb.remove({ id: inserted.id });
    const after = await userDb.findById({ id: inserted.id });
    expect(before).toStrictEqual(inserted);
    expect(after).toBeFalsy();
  });
});
