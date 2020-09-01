const { makeId, isValidId } = require("../../id");
const { makeUser } = require(".");

describe("making user entity", () => {
  it("throw if credentials not provided", () => {
    expect(() => makeUser({ credentials: undefined })).toThrow();
  });
  it("throw if firebaseId credential is not provided", () => {
    expect(() =>
      makeUser({ credentials: { firebaseId: undefined } })
    ).toThrow();
  });

  it("throw if invalid firebaseId", () => {
    expect(() =>
      makeUser({ credentials: { firebaseId: 1234567890 } })
    ).toThrow();
  });

  it("throw if invalid id", () => {
    expect(() =>
      makeUser({
        id: "invalid id",
        credentials: {
          firebaseId: makeId(),
        },
      })
    ).toThrow();
  });

  it("use provided id", () => {
    const id = makeId();
    const user = makeUser({
      id,
      credentials: { firebaseId: makeId() },
    });
    expect(user.id).toBe(id);
  });

  it("creates new id if not provided", () => {
    const user = makeUser({
      id: undefined,
      credentials: { firebaseId: makeId() },
    });
    expect(isValidId(user.id)).toBe(true);
  });
});
