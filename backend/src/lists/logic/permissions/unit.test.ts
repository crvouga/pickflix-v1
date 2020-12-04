import { makeUserFake } from "../../../users/models";
import { buildListLogicTest } from "../build";

describe("list permission logic", () => {
  it("add list editors", async () => {
    const { listLogic } = buildListLogicTest();

    const user1 = makeUserFake({
      username: "user1",
    });
    const user2 = makeUserFake({
      username: "user2",
    });
    const user3 = makeUserFake({
      username: "user3",
    });

    for (const user of [user1, user2, user3]) {
      await listLogic.userRepository.add(user);
    }

    const list = await listLogic.addList({
      title: "my shared list",
      ownerId: user1.id,
    });

    await listLogic.addEditors({
      listId: list.id,
      userId: user1.id,
      editorIds: [user2.id, user3.id],
    });

    const listAggergation = await listLogic.aggergateList(list);

    expect(listAggergation.editors).toHaveLength(2);
    expect(listAggergation.owner).toEqual(user1);
    expect(listAggergation.editors).toContainEqual(user2);
    expect(listAggergation.editors).toContainEqual(user3);
  });

  it("remove editor", async () => {
    const { listLogic } = buildListLogicTest();

    const user1 = makeUserFake({
      username: "user1",
    });
    const user2 = makeUserFake({
      username: "user2",
    });
    const user3 = makeUserFake({
      username: "user3",
    });

    for (const user of [user1, user2, user3]) {
      await listLogic.userRepository.add(user);
    }

    const list = await listLogic.addList({
      title: "my shared list",
      ownerId: user1.id,
    });

    await listLogic.addEditors({
      listId: list.id,
      userId: user1.id,
      editorIds: [user2.id, user3.id],
    });

    const before = await listLogic.aggergateList(list);

    await listLogic.removeEditors({
      listId: list.id,
      userId: user1.id,
      editorIds: [user2.id],
    });

    const after = await listLogic.aggergateList(list);

    expect(before.editors).toHaveLength(2);
    expect(before.owner).toEqual(user1);
    expect(before.editors).toContainEqual(user2);
    expect(before.editors).toContainEqual(user3);
    //
    expect(after.editors).toHaveLength(1);
    expect(after.owner).toEqual(user1);
    expect(after.editors).not.toContainEqual(user2);
    expect(after.editors).toContainEqual(user3);
  });

  it("checks is user is owner or editor", async () => {
    const { listLogic } = buildListLogicTest();
    const owner = makeUserFake();
    const editor = makeUserFake();
    const someUser = makeUserFake();
    const list = await listLogic.addList({
      ownerId: owner.id,
      title: "shared list",
    });

    const listId = list.id,
      ownerId = owner.id,
      editorId = editor.id,
      someUserId = someUser.id;

    await listLogic.addEditors({
      listId,
      userId: ownerId,
      editorIds: [editorId],
    });

    expect(
      await listLogic.isOwner({
        listId,
        userId: ownerId,
      })
    ).toEqual(true);
    expect(
      await listLogic.isOwner({
        listId,
        userId: editorId,
      })
    ).toEqual(false);
    expect(
      await listLogic.isOwner({
        listId,
        userId: someUserId,
      })
    ).toEqual(false);

    expect(
      await listLogic.isEditor({
        listId,
        userId: ownerId,
      })
    ).toEqual(false);
    expect(
      await listLogic.isEditor({
        listId,
        userId: editorId,
      })
    ).toEqual(true);
    expect(
      await listLogic.isEditor({
        listId,
        userId: someUserId,
      })
    ).toEqual(false);
  });
});
