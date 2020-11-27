import supertest from "supertest";
import { buildAppTest } from "../../../app/build/build-test";
import { makeMediaIdFake } from "../../../media/models/types";

describe("get list items", () => {
  it("gets items", async (done) => {
    const { app, listLogic, currentUser } = await buildAppTest();

    const list = await listLogic.addList({
      ownerId: currentUser.id,
      title: "my list",
    });

    const mediaId = makeMediaIdFake();

    const listItems = await listLogic.addListItems([
      {
        userId: currentUser.id,
        listId: list.id,
        mediaId,
      },
    ]);

    const response = await supertest(app)
      .get(`/api/list-items`)
      .query({ listId: list.id })
      .expect(200);

    expect.assertions(listItems.length);
    for (const listItemAggergate of response.body?.results ?? []) {
      expect(listItems).toContainEqual(listItemAggergate.listItem);
    }

    done();
  });
});

describe("posting list items", () => {
  it("adds item to list", async (done) => {
    const { currentUser, listLogic, app } = await buildAppTest();

    const list = await listLogic.addList({
      ownerId: currentUser.id,
      title: "cool movies",
      description: "cool",
    });

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
    const { app, listLogic, currentUser } = await buildAppTest();

    const list = await listLogic.addList({
      ownerId: currentUser.id,
      title: "my movies",
      description: "some cool movies",
    });

    const mediaId = makeMediaIdFake();
    const [listItem] = await listLogic.addListItems([
      {
        userId: currentUser.id,
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
