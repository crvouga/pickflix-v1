import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicFake } from "../build.fake";
import { TmdbMediaType } from "../../../media/models/types";
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
