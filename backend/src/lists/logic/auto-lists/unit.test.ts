import { buildListLogicFake } from "../build.fake";
import { makeUserFake } from "../../../users/models/make-user.fake";

describe("create auto lists", () => {
  it("creates auto lists", async () => {
    const { listLogic } = buildListLogicFake();
    const user = makeUserFake();
    const added = await listLogic.initializeAutoLists({ user });
    const got = await listLogic.getAutoListAggergations({ ownerId: user.id });

    expect(got.map((_) => _.list)).toEqual(
      expect.arrayContaining(
        added.map((added) => expect.objectContaining(added))
      )
    );
  });
});
