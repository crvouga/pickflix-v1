import {
  makeUserFake,
  makeCredential,
  makePasswordHash,
  passwordHashCompare,
  castUsername,
  castEmailAddress,
  castPassword,
} from "../../models";
import { ONE_DAY_IN_MILLISECONDS } from ".";
import {
  makeResetPasswordToken,
  decodeToken,
  encodeToken,
  makeResetPasswordTokenData,
  ResetPasswordTokenData,
} from "./token";
import { buildUserLogicTest } from "../build";
import { castTimestamp } from "../../../common/utils";

describe("resetting password", () => {
  it("encodes and decodes password reset token", async () => {
    const user = makeUserFake();

    const credential = makeCredential({
      userId: user.id,
      passwordHash: await makePasswordHash(castPassword("password")),
    });

    const before = makeResetPasswordToken({
      user,
      passwordCredential: credential,
    });

    const decoded = decodeToken(before);

    const after = encodeToken(decoded);

    expect(after).toStrictEqual(before);
  });

  it("updates password", async () => {
    const { userLogic } = await buildUserLogicTest();

    const beforePassword = castPassword("password");
    const afterPassword = castPassword("new password");

    const user = await userLogic.createUserWithPassword({
      username: castUsername("crvouga"),
      emailAddress: castEmailAddress("crvouga@gmail.com"),
      password: beforePassword,
    });

    const credential = await userLogic.getPasswordCredential({
      userId: user.id,
    });

    const resetPasswordToken = makeResetPasswordToken({
      user,
      passwordCredential: credential,
    });

    const [before] = await userLogic.credentialRepository.find({
      id: credential.id,
    });

    await userLogic.resetPassword({
      resetPasswordToken,
      newPassword: afterPassword,
    });

    const [after] = await userLogic.credentialRepository.find({
      id: credential.id,
    });

    expect(await passwordHashCompare(beforePassword, before.passwordHash)).toBe(
      true
    );
    expect(await passwordHashCompare(beforePassword, after.passwordHash)).toBe(
      false
    );
    expect(await passwordHashCompare(afterPassword, after.passwordHash)).toBe(
      true
    );
  });
  it("blockes if reset password token is older than a day", async () => {
    const { userLogic } = await buildUserLogicTest();

    const user = await userLogic.createUserWithPassword({
      username: castUsername("crvouga"),
      emailAddress: castEmailAddress("crvouga@gmail.com"),
      password: castPassword("password"),
    });

    const credential = await userLogic.getPasswordCredential({
      userId: user.id,
    });

    const resetPasswordTokenData: ResetPasswordTokenData = {
      ...makeResetPasswordTokenData({
        passwordVerifiedAt: credential.verifiedAt,
        passwordHash: credential.passwordHash,
        emailAddress: user.emailAddress,
        userId: user.id,
      }),
      createdAt: castTimestamp(Date.now() - ONE_DAY_IN_MILLISECONDS * 2),
    };

    const resetPasswordToken = encodeToken(resetPasswordTokenData);

    expect.assertions(1);
    try {
      await userLogic.resetPassword({
        resetPasswordToken,
        newPassword: castPassword("new password"),
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
