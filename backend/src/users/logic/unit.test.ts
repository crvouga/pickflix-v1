import { buildUserLogicTest } from "./build";
import { makeUserFake } from "../models";

describe("user logic", () => {
  it("searchs users by username and displayName", async () => {
    const { userLogic } = buildUserLogicTest();

    const user1 = makeUserFake({
      username: "1",
    });
    const user2 = makeUserFake({
      username: "12",
    });
    const user3 = makeUserFake({
      username: "123",
    });
    for (const user of [user1, user2, user3]) {
      await userLogic.userRepository.add(user);
    }

    const results1 = await userLogic.searchByUsernameAndDisplayName("1");
    expect(results1).toContainEqual(user1);
    expect(results1).toContainEqual(user2);
    expect(results1).toContainEqual(user3);

    const results2 = await userLogic.searchByUsernameAndDisplayName("2");
    expect(results2).toContainEqual(user2);
    expect(results2).toContainEqual(user3);

    const results3 = await userLogic.searchByUsernameAndDisplayName("3");
    expect(results3).toContainEqual(user3);
  });

  it("edit username", async () => {
    const { userLogic } = buildUserLogicTest();
    const before = makeUserFake({
      username: "before",
    });
    await userLogic.userRepository.add(before);

    await userLogic.editUser({
      id: before.id,
      username: "after",
    });

    const after = await userLogic.getUser({ id: before.id });

    const { username: usernameBefore, ...userBefore } = before;
    const { username: usernameAfter, ...userAfter } = after;

    expect(usernameBefore).toBe("before");
    expect(usernameAfter).toBe("after");
    expect(userAfter).toStrictEqual(userBefore);
  });
});
