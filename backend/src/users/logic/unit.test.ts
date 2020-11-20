import { buildUserLogicFake } from "./user-logic.fake";
import { makeUserFake } from "../models";

describe("user logic", () => {
  it("searchs users by username and displayName", async () => {
    const { userLogic } = buildUserLogicFake();

    const user1 = makeUserFake({
      username: "1",
    });
    const user2 = makeUserFake({
      username: "12",
    });
    const user3 = makeUserFake({
      username: "123",
    });
    await userLogic.unitOfWork.Users.add([user1, user2, user3]);

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
});
