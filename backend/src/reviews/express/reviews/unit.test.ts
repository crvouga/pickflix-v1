import supertest from "supertest";
import { buildExpressAppFake } from "../../../express/build.fake";
import { makeMediaIdFake } from "../../../media/models/types";

describe("/api/reviews", () => {
  it("POST then GET", async () => {
    const { app } = await buildExpressAppFake();

    const mediaId = makeMediaIdFake();

    const before = await supertest(app)
      .get("/api/reviews")
      .query({
        ...mediaId,
      });

    const posted = await supertest(app).post("/api/reviews").send({
      title: "Cool Movie",
      content: "cool movie",
      rating: 5,
      mediaId,
    });

    const after = await supertest(app)
      .get("/api/reviews")
      .query({
        ...mediaId,
      });

    expect(before.body.results).toHaveLength(0);
    expect(after.body.results).toHaveLength(1);
    expect(after.body.results[0].review).toEqual(
      expect.objectContaining(posted.body)
    );
  });

  it("POST /reviews", async (done) => {
    const { app } = await buildExpressAppFake();
    const mediaId = makeMediaIdFake();
    const response = await supertest(app)
      .post("/api/reviews")
      .send({
        title: "Cool Movie",
        content: "cool movie",
        rating: 4,
        mediaId,
      })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        content: "cool movie",
        mediaId,
      })
    );
    done();
  });
});
