import supertest from "supertest";
import { buildExpressAppFake } from "../../../express/build.fake";
import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";

describe("GET /lists/{list-id}/list-items", () => {
  it("gets items", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my list",
      },
    ]);

    const listItems = await listLogic.addListItems([
      {
        userId: user.id,
        tmdbMediaId: 550,
        tmdbMediaType: TmdbMediaType.movie,
        listId: list.id,
      },
    ]);

    await supertest(app)
      .get(`/api/lists/${list.id}/list-items`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            listItems.map((listItem) => expect.objectContaining({ listItem }))
          )
        );
      });
    done();
  });
});

describe("POST /lists/{list-id}/list-items", () => {
  it("adds item to list", async (done) => {
    const { user, listLogic, app } = await buildExpressAppFake();

    const agent = supertest(app);
    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "cool movies",
        description: "cool",
      },
    ]);

    const listItemInfo = {
      tmdbMediaId: 42,
      tmdbMediaType: "movie",
    };
    await agent
      .post(`/api/lists/${list.id}/list-items`)
      .send(listItemInfo)
      .expect(201);

    done();
  });
});

describe("DELETE /lists/{list-id}/list-items/{list-item-id}", () => {
  it("deletes list item", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
        description: "some cool movies",
      },
    ]);

    const [listItem] = await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        tmdbMediaId: 42,
        tmdbMediaType: TmdbMediaType.movie,
      },
    ]);

    await supertest(app)
      .delete(`/api/lists/${list.id}/list-items`)
      .send([listItem.id])
      .expect(204);

    const listItemAggergations = await listLogic.getListItemAggergations({
      listId: list.id,
    });
    expect(listItemAggergations).not.toContainEqual({ listItem });

    done();
  });
});

describe("GET /list-items/lists", () => {
  it("gets list from list item media", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();

    const listInfo = { title: "hello", ownerId: user.id };

    const [list1, list2, list3] = await listLogic.addLists([
      listInfo,
      listInfo,
      listInfo,
    ]);

    const tmdbMediaInfo = {
      tmdbMediaId: 550 as TmdbMediaId,
      tmdbMediaType: "movie" as TmdbMediaType,
    };
    const listItemInfo = {
      ...tmdbMediaInfo,
      userId: user.id,
    };

    await listLogic.addListItems([
      { ...listItemInfo, listId: list1.id },
      { ...listItemInfo, listId: list2.id },
    ]);

    const response = await supertest(app)
      .get("/api/list-items/lists")
      .query(tmdbMediaInfo)
      .expect(200);

    expect(response.body).toContainEqual(list1);
    expect(response.body).toContainEqual(list2);
    expect(response.body).not.toContainEqual(list3);

    done();
  });
});
