import supertest from "supertest";
import { buildExpressAppFake } from "../../../express/build.fake";

describe("DELETE", () => {
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
