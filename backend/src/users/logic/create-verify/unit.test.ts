import { buildUserLogicTest } from "../build";
import { castEmailAddress, FAKE_USER_INFO, castPassword } from "../../models";

describe("user logic", () => {
  it("creates and gets user", async () => {
    const { userLogic } = await buildUserLogicTest();
    const user = await userLogic.createUserWithPassword(FAKE_USER_INFO);
    const got1 = await userLogic.getUser({ id: user.id });
    const got2 = await userLogic.getUser({ username: user.username });
    const got3 = await userLogic.getUser({ emailAddress: user.emailAddress });
    expect(got1).toStrictEqual(user);
    expect(got2).toStrictEqual(user);
    expect(got3).toStrictEqual(user);
  });

  it("only allows unique email and or username", async () => {
    const { userLogic } = await buildUserLogicTest();

    await userLogic.createUserWithPassword(FAKE_USER_INFO);

    expect.assertions(1);
    try {
      await userLogic.createUserWithPassword(FAKE_USER_INFO);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("verifies username and password", async () => {
    const { userLogic } = await buildUserLogicTest();

    const PASSWORD = castPassword("password");

    const created = await userLogic.createUserWithPassword({
      ...FAKE_USER_INFO,
      password: PASSWORD,
    });

    const verified = await userLogic.verifyEmailAddressAndPassword({
      emailAddress: created.emailAddress,
      password: PASSWORD,
    });

    expect(created).toStrictEqual(verified);
  });
  // it("emits an event when created", async (done) => {
  //   const emitMock = jest.fn();

  //   const { userLogic } = buildUserLogicTest({
  //     eventEmitter: {
  //       ...new EventEmitter(),
  //       emit: emitMock,
  //     },
  //   });
  //   const { username, emailAddress, displayName } = makeUserFake();
  //   const user = await userLogic.createUserWithPassword({
  //     username,
  //     emailAddress,
  //     displayName,
  //     password: "password",
  //   });
  //   expect(emitMock.mock.calls[0][0]).toStrictEqual(EventTypes.USER_CREATED);
  //   expect(emitMock.mock.calls[0][1]).toStrictEqual({ user });
  //   done();
  // });
});
