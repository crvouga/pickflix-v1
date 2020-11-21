import supertest from "supertest";
import { buildExpressAppFake } from "../../../app/express/build.fake";

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
  it("gets lists", async () => {
    const { listLogic, user, app } = await buildExpressAppFake();

    const lists = await listLogic.addLists(
      [1, 2, 3, 4, 5].map((n) => ({
        ownerId: user.id,
        title: "my list",
        description: "my description",
      }))
    );

    const response = await supertest(app)
      .get(`/api/lists`)
      .query({ ownerId: user.id })
      .expect(200);

    const results = response.body?.results ?? [];

    expect(results).not.toHaveLength(0);

    for (const list of lists) {
      expect(results).toContainEqual(
        expect.objectContaining({
          list: list,
        })
      );
    }
  });
  it("sends a list with items", async (done) => {
    const { listLogic, user, app } = await buildExpressAppFake();

    const lists = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my list",
        description: "my description",
      },
    ]);

    const response = await supertest(app)
      .get(`/api/lists`)
      .query({ id: lists[0].id })
      .expect(200);

    const results = response.body?.results ?? [];

    expect(results).not.toHaveLength(0);

    for (const list of lists) {
      expect(results).toContainEqual(
        expect.objectContaining({
          list: list,
        })
      );
    }

    done();
  });
});

describe("PATCH /lists", () => {
  it("fails", async (done) => {
    const { user, listLogic, app } = await buildExpressAppFake();
    const [added] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: "my movies",
      },
    ]);

    const invalidEdit = {
      title: "",
    };

    await supertest(app)
      .patch(`/api/lists/${added.id}`)
      .send(invalidEdit)
      .expect(400);

    done();
  });
  it("succeeds", async (done) => {
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
      .expect(204);

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
