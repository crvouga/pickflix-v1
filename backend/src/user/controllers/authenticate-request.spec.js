const { makeFakeUser } = require("../__test__/user");
const { buildAuthenticateRequest } = require("./authenticate-request");

const fakeUser = makeFakeUser();
const autenicateRequest = buildAuthenticateRequest({
  getByCredentialsElseCreateNew: async () => fakeUser,
  authenicateFirebaseIdToken: async () => fakeUser.credentials.firebaseId,
});

describe("authenicate request", () => {
  it("returns a user", async () => {
    const request = { headers: { authorization: "whatever" } };
    const actual = await autenicateRequest(request);
    expect(actual).toStrictEqual(fakeUser);
  });

  it("rejects if not authorization header", () => {
    const request = { headers: { authorization: undefined } };
    expect(autenicateRequest(request)).rejects.toBeTruthy();
  });

  it("rejects when authenicateFirebaseIdToken throws", async () => {
    const fakeUser = makeFakeUser();

    const autenicateRequest = buildAuthenticateRequest({
      authenicateFirebaseIdToken: () => {
        throw new Error("error!");
      },
      getByCredentialsElseCreateNew: async () => fakeUser,
    });
    const request = { headers: { authorization: "whatever" } };

    expect(autenicateRequest(request)).rejects.toBeTruthy();
  });
});
