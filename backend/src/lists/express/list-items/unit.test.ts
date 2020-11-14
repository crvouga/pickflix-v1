import supertest from "supertest";
import { buildExpressAppFake } from "../../../express/build.fake";
import { makeMediaIdFake } from "../../../media/models/types";

describe("get list items", () => {
  it("gets items", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my list",
      },
    ]);

    const mediaId = makeMediaIdFake();

    const listItems = await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        mediaId,
      },
    ]);

    const response = await supertest(app)
      .get(`/api/list-items`)
      .query({ listId: list.id })
      .expect(200);

    for (const listItemAggergate of response.body) {
      expect(listItems).toContainEqual(listItemAggergate.listItem);
    }

    done();
  });
});

describe("posting list items", () => {
  it("adds item to list", async (done) => {
    const { user, listLogic, app } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "cool movies",
        description: "cool",
      },
    ]);

    await supertest(app)
      .post(`/api/list-items`)
      .send({
        listId: list.id,
        mediaId: makeMediaIdFake(),
      })
      .expect(201);

    done();
  });
});

describe("delete list items", () => {
  it("deletes list item", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
        description: "some cool movies",
      },
    ]);
    const mediaId = makeMediaIdFake();
    const [listItem] = await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        mediaId,
      },
    ]);

    await supertest(app)
      .delete(`/api/list-items`)
      .send([{ id: listItem.id }])
      .expect(204);

    const listItemAggergations = await listLogic.getListItemAggergations({
      listId: list.id,
    });
    expect(listItemAggergations).not.toContainEqual({ listItem });

    done();
  });
});
