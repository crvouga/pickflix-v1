const makeUser = require("../__test__/user");
const buildAuthenticateRequest = require("./authenticate-request");

const user = makeUser();

const autenicateRequest = buildAuthenticateRequest({
  getByForeignIds: async () => user,
  authenicateFirebaseIdToken: async () => user.foreignIds.firebaseId,
});

describe("authenicate request", () => {
  it("returns a user", async () => {
    const request = { headers: { authorization: "whatever" } };
    const actual = await autenicateRequest(request);
    expect(actual).toStrictEqual(user);
  });

  it("rejects if not authorization header", () => {
    const request = { headers: { authorization: undefined } };
    expect(autenicateRequest(request)).rejects.toBeTruthy();
  });

  it("rejects when authenicateFirebaseIdToken throws", async () => {
    const user = makeUser();
    const autenicateRequest = buildAuthenticateRequest({
      authenicateFirebaseIdToken: () => {
        throw new Error("error!");
      },
      getByCredentialsElseCreateNew: async () => user,
    });
    const request = { headers: { authorization: "whatever" } };

    expect(autenicateRequest(request)).rejects.toBeTruthy();
  });
});
