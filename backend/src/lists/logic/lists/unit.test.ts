import { makeMediaIdFake } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";

describe("list logic", () => {
  it("gets lists by media id", async () => {
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

    const mediaId = makeMediaIdFake();

    await listLogic.addListItems([
      {
        userId: user.id,
        listId: list1.id,
        mediaId: mediaId,
      },
      {
        userId: user.id,
        listId: list3.id,
        mediaId: mediaId,
      },
    ]);

    const listsFromMediaIdAndUserId = await listLogic.getListsFromMediaIdAndUserId(
      {
        userId: user.id,
        mediaId: mediaId,
      }
    );

    expect(listsFromMediaIdAndUserId).toContainEqual(
      expect.objectContaining({ id: list1.id })
    );
    expect(listsFromMediaIdAndUserId).toContainEqual(
      expect.objectContaining({ id: list3.id })
    );
    //
    expect(listsFromMediaIdAndUserId).not.toContainEqual(
      expect.objectContaining({ id: list2.id })
    );
  });

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

    await listLogic.removeList({
      userId: user.id,
      listId: list1.id,
    });
    await listLogic.removeList({ userId: user.id, listId: list3.id });

    const after = await listLogic.getListAggergationsFromUserId({
      userId: user.id,
    });
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
      userId: user.id,
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

  it("only allows owner of list to remove list", async () => {
    const { listLogic } = buildListLogicTest();
    const owner = makeUserFake();
    const editor = makeUserFake();
    const list = await listLogic.addList({
      ownerId: owner.id,
      title: "shared list",
    });

    await listLogic.addEditors({
      listId: list.id,
      userId: owner.id,
      editorIds: [editor.id],
    });

    const before = await listLogic.getList({ listId: list.id });

    await listLogic.removeList({
      listId: list.id,
      userId: editor.id,
    });

    const after = await listLogic.getList({ listId: list.id });

    expect(before).toEqual(after);
  });
});
