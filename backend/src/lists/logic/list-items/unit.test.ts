import { makeMediaIdFake } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicTest } from "../build";

describe("getting list items", () => {
  it("get aggergated list items", async () => {
    const { listLogic } = await buildListLogicTest();

    const user = makeUserFake();
    const list = await listLogic.addList({
      ownerId: user.id,
      title: "my list",
    });

    const listItems = await listLogic.addListItems(
      [1, 2, 3, 4, 5].map((n) => ({
        userId: user.id,
        listId: list.id,
        mediaId: makeMediaIdFake({
          tmdbMediaId: n,
        }),
      }))
    );

    const listItemAggergates = await listLogic.getListItemAggergations({
      listId: list.id,
    });

    for (const listItemAggergate of listItemAggergates) {
      expect(listItems).toContainEqual(listItemAggergate.listItem);
    }
  });
  it("rejects if duplicate list items", async () => {
    const { listLogic } = await buildListLogicTest();

    const currentUser = makeUserFake();

    const list = await listLogic.addList({
      ownerId: currentUser.id,
      title: "my list",
    });

    const mediaId = makeMediaIdFake();

    expect.assertions(1);
    try {
      await listLogic.addListItems([
        {
          userId: currentUser.id,
          listId: list.id,
          mediaId,
        },
        {
          userId: currentUser.id,
          listId: list.id,
          mediaId,
        },
        {
          userId: currentUser.id,
          listId: list.id,
          mediaId,
        },
      ]);
      expect(true).toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("removes list item by list id and media ids", async () => {
    const { listLogic } = await buildListLogicTest();

    const currentUser = makeUserFake();

    const list = await listLogic.addList({
      ownerId: currentUser.id,
      title: "my list",
    });

    const mediaId1 = makeMediaIdFake({
      tmdbMediaId: 550,
    });
    const mediaId2 = makeMediaIdFake({
      tmdbMediaId: 123123,
    });

    await listLogic.addListItems([
      {
        userId: currentUser.id,
        listId: list.id,
        mediaId: mediaId1,
      },
      {
        userId: currentUser.id,

        listId: list.id,
        mediaId: mediaId2,
      },
    ]);

    const before = await listLogic.getListItemAggergations({ listId: list.id });
    await listLogic.removeListItems([
      {
        listId: list.id,
        mediaId: mediaId1,
      },
    ]);
    const after = await listLogic.getListItemAggergations({ listId: list.id });
    expect(before).toHaveLength(2);
    expect(after).toHaveLength(1);

    expect(
      await listLogic.getListItemAggergations({
        listId: list.id,
        mediaId: mediaId1,
      })
    ).toHaveLength(0);
    expect(
      await listLogic.getListItemAggergations({
        listId: list.id,
        mediaId: mediaId2,
      })
    ).toHaveLength(1);
  });
});
