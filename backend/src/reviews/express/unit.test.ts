import supertest from "supertest";
import { buildExpressAppFake } from "../../express/build.fake";
import { TmdbMediaId, TmdbMediaType } from "../../media/models/types";
import { makeUserFake } from "../../users/models/make-user.fake";
import { makeReviewFake } from "../models/make-review.fake";

describe("/api/reviews", () => {
  it("POST then GET", async () => {
    const { app } = await buildExpressAppFake();

    const before = await supertest(app).get("/api/reviews").query({
      tmdbMediaId: 550,
      tmdbMediaType: TmdbMediaType.movie,
    });

    const posted = await supertest(app).post("/api/reviews").send({
      content: "cool movie",
      rating: 5,
      tmdbMediaId: 550,
      tmdbMediaType: TmdbMediaType.movie,
    });

    const after = await supertest(app).get("/api/reviews").query({
      tmdbMediaId: 550,
      tmdbMediaType: TmdbMediaType.movie,
    });

    expect(before.body).toHaveLength(0);
    expect(after.body).toHaveLength(1);
    expect(after.body[0].review).toEqual(expect.objectContaining(posted.body));
  });

  it("POST /reviews", async (done) => {
    const { app } = await buildExpressAppFake();

    const response = await supertest(app)
      .post("/api/reviews")
      .send({
        content: "cool movie",
        tmdbMediaId: 550 as TmdbMediaId,
        tmdbMediaType: TmdbMediaType.movie,
        rating: 4,
      })
      .expect(201);

    const created = response.body;

    expect(created).toEqual(
      expect.objectContaining({
        content: "cool movie",
        tmdbMediaId: 550 as TmdbMediaId,
        tmdbMediaType: TmdbMediaType.movie,
      })
    );
    done();
  });
});
