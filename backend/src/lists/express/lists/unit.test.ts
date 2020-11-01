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

    const lists = await listLogic.getLists({ id: list.id });

    expect(lists).toHaveLength(0);

    done();
  });
});

describe("GET /lists", () => {
  it("gets lists for current user", async (done) => {
    const { listLogic, user, app } = await buildExpressAppFake();

    const lists = await listLogic.addLists(
      [1, 2, 3, 4, 5].map(() => ({
        ownerId: user.id,
        title: "my movies 1",
        description: "some cool movies...",
      }))
    );

    supertest(app)
      .get("/api/lists")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(lists.map((_) => expect.objectContaining(_)))
        );
        done();
      });
  });
});

describe("GET /lists", () => {
  it("gets auto lists", async (done) => {
    const { listLogic, user, app } = await buildExpressAppFake();
    const [added] = await listLogic.initializeAutoLists({ user: user });

    const expected = {
      id: added.id,
      ownerId: added.ownerId,
      key: added.key,
    };

    supertest(app)
      .get(`/api/lists/${added.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(expected));
        done();
      });
  });
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
        expect(response.body).toEqual(expect.objectContaining(expected));
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
        expect(response.body).toEqual(
          expect.objectContaining({
            ...created,
            ...edits,
          })
        );
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
