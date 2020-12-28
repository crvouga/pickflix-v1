import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";
import { INITIAL_AUTO_LIST_INFOS } from "../../models";

describe("auto list logic", () => {
  it("creates auto lists", async () => {
    const { listLogic } = await buildListLogicTest();
    const user = makeUserFake();
    await listLogic.initializeAutoLists({ user });

    const got = await listLogic.getAutoListAggergations({ ownerId: user.id });

    expect(got).toHaveLength(INITIAL_AUTO_LIST_INFOS.length);
    for (const { key } of INITIAL_AUTO_LIST_INFOS) {
      expect(got.map((aggergation) => aggergation.autoList)).toContainEqual(
        expect.objectContaining({ key })
      );
    }
  });
});
