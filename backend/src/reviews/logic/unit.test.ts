import { makeId } from "../../app/id";
import { castTmdbMediaId, makeMediaIdFake } from "../../media/models/types";
import { castUserId } from "../../users/models";
import { makeUserFake } from "../../users/models/make-user.fake";
import { ReviewVoteValue } from "../models/make-review-vote";
import { makeReviewFake } from "../models/make-review.fake";
import { buildReviewLogicTest } from "./build";

describe("review logic", () => {
  it("gets all reviews for a user", async () => {
    const { reviewLogic } = await buildReviewLogicTest();
    const user = makeUserFake();
    const reviewsByUser = [1, 2, 3].map((n) =>
      makeReviewFake({
        authorId: user.id,
        mediaId: makeMediaIdFake({ tmdbMediaId: castTmdbMediaId(n) }),
      })
    );

    const added = await reviewLogic.addReviews(reviewsByUser);
    const got = await reviewLogic.getReviews({ authorId: user.id });
    expect(added).toStrictEqual(got);
  });

  it("gets review for a media", async () => {
    const { reviewLogic } = await buildReviewLogicTest();

    const users = [1, 2, 3].map(() =>
      makeUserFake({
        id: castUserId(makeId()),
      })
    );
    const mediaId = makeMediaIdFake();
    const reviewsForMedia = users.map((user) =>
      makeReviewFake({
        authorId: user.id,
        mediaId,
      })
    );

    const added = await reviewLogic.addReviews(reviewsForMedia);
    const got = await reviewLogic.getReviews({
      mediaId,
    });
    expect(added).toStrictEqual(got);
  });

  it("only allows one review per media", async () => {
    const { reviewLogic } = await buildReviewLogicTest();

    const user = makeUserFake();
    const mediaId = makeMediaIdFake();
    const reviewsOnSameMedia = [1, 2].map(() =>
      makeReviewFake({
        authorId: user.id,
        mediaId,
      })
    );
    expect.assertions(1);
    try {
      await reviewLogic.addReviews(reviewsOnSameMedia);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  it("puts review in repo", async () => {
    const { reviewLogic } = await buildReviewLogicTest();
    const reviewInfo = makeReviewFake();
    const [added] = await reviewLogic.addReviews([reviewInfo]);
    const [found] = await reviewLogic.reviewRepository.find({
      id: added.id,
    });
    expect(found).toMatchObject(added);
  });
  it("removes review", async () => {
    const { reviewLogic } = await buildReviewLogicTest();

    const reviewInfo = makeReviewFake();

    await reviewLogic.addReviews([reviewInfo]);

    const before = await reviewLogic.getReviews({
      authorId: reviewInfo.authorId,
    });

    await reviewLogic.removeReviews(before[0].id);

    const after = await reviewLogic.getReviews({
      authorId: reviewInfo.authorId,
    });

    expect(before).toHaveLength(1);
    expect(after).toHaveLength(0);
  });
  it("edits review", async () => {
    const { reviewLogic } = await buildReviewLogicTest();

    const [added] = await reviewLogic.addReviews([
      makeReviewFake({ content: "good" }),
    ]);
    const edited = await reviewLogic.editReview({
      ...added,
      content: "bad",
    });
    expect(edited.id).toEqual(added.id);
    expect(edited.content).not.toEqual(added.content);
  });

  it("get aggergated review", async () => {
    const { reviewLogic } = await buildReviewLogicTest();
    const user = makeUserFake();
    const review = await reviewLogic.addReview(makeReviewFake());

    for (const voteValue of [
      ReviewVoteValue.UP,
      ReviewVoteValue.DOWN,
      ReviewVoteValue.UP,
    ]) {
      await reviewLogic.setReviewVote({
        reviewId: review.id,
        userId: user.id,
        voteValue,
      });
    }
    const aggergated = await reviewLogic.getAggregation({
      userId: user.id,
      reviewId: review.id,
    });
    expect(aggergated?.review).toStrictEqual(review);
    expect(aggergated?.reviewVoteValue).toStrictEqual(ReviewVoteValue.UP);
    expect(aggergated?.reviewVoteCount).toStrictEqual(1);
  });
});
