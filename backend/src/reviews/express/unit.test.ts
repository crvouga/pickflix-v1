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

  it("GET /reviews?tmdbMediaId=...&tmdbMediaType=...", async () => {
    const { app, reviewLogic, user } = await buildExpressAppFake();

    for (const i of [1, 2, 3]) {
      await reviewLogic.addReview(
        makeReviewFake({
          authorId: (await makeUserFake()).id,
        })
      );
    }

    const expected = await reviewLogic.getAllAggergationsForMedia({
      userId: user.id,
      tmdbMediaId: 550,
      tmdbMediaType: TmdbMediaType.movie,
    });

    const response = await supertest(app)
      .get("/api/reviews")
      .query({
        tmdbMediaId: 550,
        tmdbMediaType: TmdbMediaType.movie,
      })
      .expect(200);

    expect(response.body).toStrictEqual(expected);
  });

  it("POST /reviews", async () => {
    const { app } = await buildExpressAppFake();

    const response = await supertest(app)
      .post("/api/reviews")
      .send({
        content: "cool movie",
        tmdbMediaId: 550 as TmdbMediaId,
        tmdbMediaType: TmdbMediaType.movie,
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
  });
});
