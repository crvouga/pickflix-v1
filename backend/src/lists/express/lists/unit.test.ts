import supertest from "supertest";
import { buildAppTest } from "../../../app/build/build-test";
import { ListAggergation } from "../../models/types";
import { GetListsResponse } from ".";

describe("lists endpoints", () => {
  it("deletes list", async (done) => {
    const { agent, currentUser } = await buildAppTest();

    await agent
      .post("/api/lists")
      .send({
        title: "my movies",
      })
      .expect(201);

    const before: { body: GetListsResponse } = await agent
      .get("/api/lists")
      .query({ userId: currentUser.id })
      .expect(200);

    const listId = before.body.results[0].list.id;

    await agent.delete(`/api/lists/${listId}`).expect(204);

    const after: { body: GetListsResponse } = await agent
      .get("/api/lists")
      .query({ userId: currentUser.id })
      .expect(200);

    expect(before.body.results).not.toHaveLength(0);
    expect(after.body.results).toHaveLength(0);

    done();
  });

  it("gets lists", async (done) => {
    const { currentUser, agent } = await buildAppTest();

    for (const n of [1, 2, 3, 4, 5]) {
      await agent
        .post("/api/lists")
        .send({
          title: `my list ${n}`,
        })
        .expect(201);
    }

    const response: { body: GetListsResponse } = await agent
      .get(`/api/lists`)
      .query({ userId: currentUser.id })
      .expect(200);

    expect(response.body.results).toHaveLength(5);

    done();
  });

  it("rejects invalid edits", async (done) => {
    const { agent, currentUser } = await buildAppTest();

    await agent
      .post("/api/lists")
      .send({
        title: `my list`,
      })
      .expect(201);

    const response: { body: GetListsResponse } = await agent
      .get("/api/lists")
      .query({ userId: currentUser.id });

    const listId = response.body.results[0].list.id;

    const invalidEdit = {
      title: "",
    };

    await agent.patch(`/api/lists/${listId}`).send(invalidEdit).expect(400);

    done();
  });
  it("succeeds", async (done) => {
    const { currentUser, listLogic, app } = await buildAppTest();
    const created = await listLogic.addList({
      ownerId: currentUser.id,
      title: "my movies",
    });

    const edits = {
      title: "My Movies!!!",
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(204);

    done();
  });

  it("responses with created list", async (done) => {
    const { agent } = await buildAppTest();

    const title = "my movies";
    const description = "some cool movies";

    const res = await agent
      .post("/api/lists")
      .send({ title, description })
      .set("Accept", "application/json")
      .expect(201);

    expect(res.body).toEqual(expect.objectContaining({ title, description }));
    done();
  });
});
