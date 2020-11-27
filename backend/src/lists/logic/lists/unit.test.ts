import { makeMediaIdFake } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";

describe("list logic", () => {
  // it("orders list by most recently item added", async () => {
  //   const { listLogic } = buildListLogicTest();
  //   const user = makeUserFake();

  //   const list1 = await listLogic.addList({
  //     ownerId: user.id,
  //     title: "list1",
  //   });

  //   const list2 = await listLogic.addList({
  //     ownerId: user.id,
  //     title: "list2",
  //   });

  //   const before = await listLogic.getListAggergations({ ownerId: user.id });

  //   const mediaId = makeMediaIdFake();

  //   await listLogic.addListItems([
  //     {
  //       userId: user.id,
  //       listId: list2.id,
  //       mediaId,
  //     },
  //   ]);

  //   const after = await listLogic.getListAggergations({ ownerId: user.id });

  //   expect(before[0].list.id).toBe(list1.id);
  //   expect(before[1].list.id).toBe(list2.id);
  //   expect(after[0].list.id).toBe(list2.id);
  //   expect(after[1].list.id).toBe(list1.id);
  // });

  it("removes lists", async () => {
    const { listLogic } = buildListLogicTest();
    const user = makeUserFake();

    const added = [];
    for (const partial of [
      {
        ownerId: user.id,
        title: "my list",
      },
      {
        ownerId: user.id,
        title: "my other list",
      },
      {
        ownerId: user.id,
        title: "my other other list",
      },
    ]) {
      added.push(await listLogic.addList(partial));
    }
    const [list1, list2, list3] = added;

    await listLogic.removeList(list1.id);
    await listLogic.removeList(list3.id);

    const after = await listLogic.getListAggergations({ ownerId: user.id });
    expect(after.map((_) => _.list)).toEqual(
      expect.arrayContaining([expect.objectContaining(list2)])
    );
  });
  it("gets same list by ownerId or listId", async () => {
    const { listLogic } = buildListLogicTest();
    const user = makeUserFake();

    const list = await listLogic.addList({
      ownerId: user.id,
      title: "my list",
    });

    const mediaId = makeMediaIdFake();
    await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        mediaId,
      },
    ]);

    const [aggergatedList1] = await listLogic.getListAggergations({
      id: list.id,
    });

    const [aggergatedList2] = await listLogic.getListAggergations({
      ownerId: user.id,
    });

    expect(aggergatedList1).toStrictEqual(aggergatedList2);
  });

  it("rejects invalid edits", async () => {
    const { listLogic } = buildListLogicTest();
    const user = makeUserFake();
    const added = await listLogic.addList({
      ownerId: user.id,
      title: "hello",
    });

    expect.assertions(1);
    try {
      await listLogic.editList({
        id: added.id,
        title: "",
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("adds lists", async () => {
    try {
      const { listLogic } = buildListLogicTest();
      const user = makeUserFake();
      const partial = { ownerId: user.id, title: "my list" };
      const added = await listLogic.addList(partial);
      expect(added).toEqual(expect.objectContaining(partial));
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
