import { TmdbMediaType } from "../../../media/models/types";
import { makeUserFake } from "../../../users/models/make-user.fake";
import { buildListLogicFake } from "../build.fake";

describe("remove lists", () => {
  it("removes lists", async () => {
    const { listLogic } = buildListLogicFake();
    const user = makeUserFake();
    const [list1, list2, list3] = await listLogic.addLists([
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
    ]);

    await listLogic.removeLists([list1, list3]);
    const after = await listLogic.getListAggergations({ ownerId: user.id });
    expect(after.map((_) => _.list)).toEqual(
      expect.arrayContaining([expect.objectContaining(list2)])
    );
  });
});

describe("getting lists", () => {
  it("gets aggergated lists by ownerId or listId", async () => {
    const { listLogic } = buildListLogicFake();
    const user = makeUserFake();
    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my list",
      },
    ]);
    const [listItem] = await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        tmdbMediaId: 550,
        tmdbMediaType: TmdbMediaType.movie,
      },
    ]);

    const [aggergatedList1] = await listLogic.getListAggergations({
      id: list.id,
    });
    const [aggergatedList2] = await listLogic.getListAggergations({
      ownerId: user.id,
    });

    expect(aggergatedList1).toStrictEqual(aggergatedList2);

    expect(aggergatedList1).toEqual(
      expect.objectContaining({
        list,
        listItemCount: expect.any(Number),
        listItems: expect.arrayContaining([
          expect.objectContaining({
            listItem,
            tmdbData: expect.any(Object),
          }),
        ]),
      })
    );
  });
});

describe("editing list", () => {
  it("rejects invalid edits", async () => {
    const { listLogic } = buildListLogicFake();
    const user = makeUserFake();
    const [added] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "hello",
      },
    ]);

    expect.assertions(1);
    try {
      await listLogic.editLists([
        {
          id: added.id,
          title: "",
        },
      ]);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("add lists", () => {
  it("adds lists", async () => {
    try {
      const { listLogic } = buildListLogicFake();
      const user = makeUserFake();
      const listInfo = { ownerId: user.id, title: "my list" };
      const [added] = await listLogic.addLists([listInfo]);
      expect(added).toEqual(expect.objectContaining(listInfo));
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
