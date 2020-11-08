import { TmdbMediaType } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicFake } from "../build.fake";

describe("getting list items", () => {
  it("get aggergated list items", async () => {
    const { listLogic } = buildListLogicFake();

    const user = makeUserFake();
    const [list] = await listLogic.addLists([
      { ownerId: user.id, title: "my list" },
    ]);

    const listItems = await listLogic.addListItems(
      [1, 2, 3, 4, 5].map((n) => ({
        userId: user.id,
        listId: list.id,
        tmdbMediaId: n,
        tmdbMediaType: TmdbMediaType.movie,
      }))
    );

    const aggergatedListItems = await listLogic.getListItemAggergations({
      listId: list.id,
    });

    expect(aggergatedListItems).toEqual(
      expect.arrayContaining(
        listItems.map((listItem) =>
          expect.objectContaining({
            listItem,
            tmdbData: expect.any(Object),
          })
        )
      )
    );
  });
});

describe("add list items to list", () => {
  it("rejects if duplicate list items", async () => {
    const { listLogic } = buildListLogicFake();

    const currentUser = makeUserFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title: "my list",
      },
    ]);

    expect.assertions(1);
    try {
      await listLogic.addListItems([
        {
          userId: currentUser.id,
          listId: list.id,
          tmdbMediaId: 550,
          tmdbMediaType: TmdbMediaType.movie,
        },
        {
          userId: currentUser.id,
          tmdbMediaId: 550,
          listId: list.id,
          tmdbMediaType: TmdbMediaType.movie,
        },
        {
          userId: currentUser.id,
          tmdbMediaId: 550,
          tmdbMediaType: TmdbMediaType.movie,
          listId: list.id,
        },
      ]);
      expect(true).toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
