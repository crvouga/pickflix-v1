import supertest from "supertest";
import { buildExpressAppFake } from "../../../express/build.fake";

describe("DELETE /lists", () => {
  it("deletes list", async (done) => {
    const { app, listLogic, user } = await buildExpressAppFake();
    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
      },
    ]);

    await supertest(app).delete(`/api/lists/${list.id}`).expect(204);

    const got = await listLogic.getListAggergations({ id: list.id });

    expect(got).toHaveLength(0);

    done();
  });
});

describe("GET /lists", () => {
  it("sends a list with items", async (done) => {
    const { listLogic, user, app } = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my list",
        description: "my description",
      },
    ]);

    const expected = {
      id: list.id,
      ownerId: list.ownerId,
      title: list.title,
      description: list.description,
    };

    supertest(app)
      .get(`/api/lists/${list.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.list).toEqual(expect.objectContaining(expected));
        done();
      });
  });
});

describe("PATCH /lists", () => {
  it("sends back error list", async (done) => {
    const { user, listLogic, app } = await buildExpressAppFake();
    const [created] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
      },
    ]);

    const edits = {
      title: "",
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(400);

    done();
  });
  it("sends back edited list", async (done) => {
    const { user, listLogic, app } = await buildExpressAppFake();
    const [created] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
      },
    ]);

    const edits = {
      title: "My Movies!!!",
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject(edits);
      });
    done();
  });
});

describe("POSTS /lists", () => {
  it("responses with created list", async (done) => {
    const { app } = await buildExpressAppFake();

    const title = "my movies";
    const description = "some cool movies";

    const res = await supertest(app)
      .post("/api/lists")
      .send({ title, description })
      .set("Accept", "application/json")
      .expect(201);

    expect(res.body).toEqual(expect.objectContaining({ title, description }));
    done();
  });

  it("responses with bad request", async (done) => {
    const { app } = await buildExpressAppFake();

    const title = "my movies";
    const description = "some cool movies";

    supertest(app)
      .post("/api/lists")
      .send({ title, description })
      .set("Accept", "application/json")
      .expect(400)
      .end(() => {
        done();
      });
  });
});
