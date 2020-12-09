import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";

describe("auto list logic", () => {
  it("creates auto lists", async () => {
    const { listLogic } = await buildListLogicTest();
    const user = makeUserFake();
    const added = await listLogic.initializeAutoLists({ user });
    const got = await listLogic.getAutoListAggergations({ ownerId: user.id });

    expect(got.map((_) => _.autoList)).toEqual(
      expect.arrayContaining(
        added.map((added) => expect.objectContaining(added))
      )
    );
  });
});
