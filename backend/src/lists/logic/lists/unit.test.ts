import { makeMediaIdFake } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";
import { makeList } from "../../models";

describe("list logic", () => {
  it("gets lists by media id", async () => {
    const { listLogic } = await buildListLogicTest();
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
    const { listLogic } = await buildListLogicTest();
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

    const after = await listLogic.getListsFromSpec({
      userId: user.id,
    });

    expect(after).toEqual(
      expect.arrayContaining([expect.objectContaining(list2)])
    );
  });
  it("gets same list by ownerId or listId", async () => {
    const { listLogic } = await buildListLogicTest();

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

    const [list1] = await listLogic.getListsFromSpec({
      listId: list.id,
    });

    const [list2] = await listLogic.getListsFromSpec({
      userId: user.id,
    });

    expect(await listLogic.aggergateList(list1)).toStrictEqual(
      await listLogic.aggergateList(list2)
    );
  });

  it("rejects invalid edits", async () => {
    const { listLogic } = await buildListLogicTest();
    const user = makeUserFake();
    const added = await listLogic.addList({
      ownerId: user.id,
      title: "hello",
    });

    expect.assertions(1);
    try {
      await listLogic.editList({
        userId: user.id,
        listId: added.id,
        edits: {
          title: "",
        },
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("adds lists", async () => {
    try {
      const { listLogic } = await buildListLogicTest();
      const user = makeUserFake();
      const partial = { ownerId: user.id, title: "my list" };
      const added = await listLogic.addList(partial);
      expect(added).toEqual(expect.objectContaining(partial));
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("only allows owner of list to remove list", async () => {
    const { listLogic } = await buildListLogicTest();
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

    const [before] = await listLogic.getListsFromSpec({ listId: list.id });

    await listLogic.removeList({
      listId: list.id,
      userId: editor.id,
    });

    const [after] = await listLogic.getListsFromSpec({ listId: list.id });

    expect(before).toEqual(after);
  });

  it("gets all lists associated with user", async () => {
    const { listLogic } = await buildListLogicTest();
    const userA = makeUserFake();
    const userB = makeUserFake();

    const listA = await listLogic.addList({
      title: "some title",
      ownerId: userA.id,
    });
    const listB = await listLogic.addList({
      title: "some title",
      ownerId: userB.id,
    });

    await listLogic.addEditors({
      listId: listA.id,
      userId: userA.id,
      editorIds: [userB.id],
    });

    const listsFromUserB = await listLogic.getListsFromUserId({
      userId: userB.id,
    });

    expect(listsFromUserB).toHaveLength(2);
    expect(listsFromUserB).toContainEqual(listA);
    expect(listsFromUserB).toContainEqual(listB);
  });
});
