import { EventEmitter } from "events";
import { EventTypes } from "../../../events";
import { makeUserFake } from "../../models";
import { buildUserLogicFake } from "../user-logic.fake";

describe("user logic", () => {
  it("creates and gets user", async () => {
    const { userLogic } = buildUserLogicFake();
    const user = await userLogic.createUserWithPassword({
      emailAddress: "crvouga@gmail.com",
      displayName: "Chris",
      username: "crvouga",
      password: "password",
    });
    const got1 = await userLogic.getUser({ id: user.id });
    const got2 = await userLogic.getUser({ username: user.username });
    const got3 = await userLogic.getUser({ emailAddress: user.emailAddress });
    expect(got1).toStrictEqual(user);
    expect(got2).toStrictEqual(user);
    expect(got3).toStrictEqual(user);
  });

  it("only allows unique email and or username", async () => {
    const { userLogic } = buildUserLogicFake();
    const info = {
      emailAddress: "crvouga@gmail.com",
      username: "123",
      displayName: "chris",
      password: "password",
    };
    await userLogic.createUserWithPassword(info);

    expect.assertions(1);
    try {
      await userLogic.createUserWithPassword(info);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("verifies username and password", async () => {
    const { userLogic } = buildUserLogicFake();

    const PASSWORD = "password";

    const userInfo = {
      emailAddress: "crvouga@gmail.com",
      username: "crvouga",
      password: PASSWORD,
      displayName: "Christopher Vouga",
    };

    const created = await userLogic.createUserWithPassword(userInfo);

    const verified = await userLogic.verifyEmailAddressAndPassword({
      emailAddress: created.emailAddress,
      password: PASSWORD,
    });

    expect(created).toStrictEqual(verified);
  });
  it("emits an event when created", async (done) => {
    const emitMock = jest.fn();

    const { userLogic } = buildUserLogicFake({
      eventEmitter: {
        ...new EventEmitter(),
        emit: emitMock,
      },
    });
    const { username, emailAddress, displayName } = makeUserFake();
    const user = await userLogic.createUserWithPassword({
      username,
      emailAddress,
      displayName,
      password: "password",
    });
    expect(emitMock.mock.calls[0][0]).toStrictEqual(EventTypes.USER_CREATED);
    expect(emitMock.mock.calls[0][1]).toStrictEqual({ user });
    done();
  });
});
