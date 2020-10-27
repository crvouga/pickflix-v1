import { buildListLogicFake } from "../build.fake";
import { makeUserFake } from "../../../users/models/make-user.fake";

describe("editing list", () => {
  it("rejects invalid edits", async () => {
    const { listLogic } = buildListLogicFake();
    const user = makeUserFake();
    const [added] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "hello",
      },
    ]);

    expect.assertions(1);
    try {
      await listLogic.editLists([
        {
          id: added.id,
          title: "",
        },
      ]);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
