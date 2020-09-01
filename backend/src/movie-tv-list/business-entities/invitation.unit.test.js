const { makeInvitation } = require("../__test__/invitation");
describe("movie tv list invitation", () => {
  it("must have a valid sender user id", () => {
    expect(() => makeInvitation({ senderUserId: "1234" })).toThrow();
  });
  it.todo("must have a valid receiver user id");
  it.todo("must have a valid movie tv list id");
});
