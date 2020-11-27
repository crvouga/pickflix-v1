import { buildListLogicTest } from "../build";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { AutoListKeys } from "../../models";

describe("auto list logic", () => {
  it("creates auto lists", async () => {
    const { listLogic } = buildListLogicTest();
    const user = makeUserFake();
    const added = await listLogic.initializeAutoLists({ user });
    const got = await listLogic.getAutoListAggergations({ ownerId: user.id });

    expect(got.map((_) => _.list)).toEqual(
      expect.arrayContaining(
        added.map((added) => expect.objectContaining(added))
      )
    );
  });

  it("gets aggergated auto lists for user indexed by key", async () => {
    const { listLogic } = buildListLogicTest();
    const user = makeUserFake();
    await listLogic.initializeAutoLists({ user });

    const byKey = await listLogic.getAutoListAggergationsByKey({
      ownerId: user.id,
    });

    expect(Object.keys(byKey).sort()).toEqual(
      Object.values(AutoListKeys).sort()
    );
  });
});
