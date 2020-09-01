const { makeId, isValidId } = require("../../id");
const makeUser = require("../__test__/user");

describe("making user entity", () => {
  it("must have a firebase foreign id", () => {
    expect(() => makeUser({ foreignIds: { firebaseId: undefined } })).toThrow();
  });

  it("must have a valid id", () => {
    expect(() =>
      makeUser({
        id: "invalid id",
      })
    ).toThrow();
  });

  it("uses provided id", () => {
    const id = makeId();
    const user = makeUser({
      id,
    });
    expect(user.id).toBe(id);
  });

  it("creates new id if not provided", () => {
    const user = makeUser({
      id: undefined,
      foreignIds: { firebaseId: makeId() },
    });
    expect(isValidId(user.id)).toBe(true);
  });
});
