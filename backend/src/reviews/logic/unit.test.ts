import { makeId } from "../../id";
import { TmdbMediaId, TmdbMediaType } from "../../media/models/types";
import { makeUserFake } from "../../users/models/make-user.fake";
import { ReviewVoteValue } from "../models/make-review-vote";
import { makeReviewFake } from "../models/make-review.fake";
import { buildReviewLogicFake } from "./build.fake";

describe("review logic", () => {
  it("gets all reviews for a user", async () => {
    const { reviewLogic } = buildReviewLogicFake();
    const user = makeUserFake();
    const reviewsByUser = [1, 2, 3].map((n) =>
      makeReviewFake({
        authorId: user.id,
        tmdbMediaId: n,
        tmdbMediaType: TmdbMediaType.movie,
      })
    );

    const added = await reviewLogic.addReviews(reviewsByUser);
    const got = await reviewLogic.getReviews({ authorId: user.id });
    expect(added).toStrictEqual(got);
  });

  it("gets review for a media", async () => {
    const { reviewLogic } = buildReviewLogicFake();

    const users = [1, 2, 3].map(() =>
      makeUserFake({
        id: makeId(),
      })
    );

    const reviewsForMedia = users.map((user) =>
      makeReviewFake({
        authorId: user.id,
        tmdbMediaId: 550,
        tmdbMediaType: TmdbMediaType.movie,
      })
    );

    const added = await reviewLogic.addReviews(reviewsForMedia);
    const got = await reviewLogic.getReviews({
      tmdbMediaId: 550,
      tmdbMediaType: TmdbMediaType.movie,
    });
    expect(added).toStrictEqual(got);
  });

  it("only allows one review per media", async () => {
    const { reviewLogic } = buildReviewLogicFake();

    const user = makeUserFake();
    const tmdbMediaId: TmdbMediaId = 550;
    const reviewsOnSameMedia = [1, 2].map(() =>
      makeReviewFake({
        authorId: user.id,
        tmdbMediaId,
        tmdbMediaType: TmdbMediaType.movie,
      })
    );
    expect.assertions(1);
    try {
      await reviewLogic.addReviews(reviewsOnSameMedia);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  it("adds review", async () => {
    const { reviewLogic } = buildReviewLogicFake();
    const reviewInfo = makeReviewFake();
    const added = await reviewLogic.addReviews([reviewInfo]);
    const got = await reviewLogic.unitOfWork.Reviews.get([
      reviewInfo.id as string,
    ]);
    expect(got).toMatchObject(added);
  });
  it("removes review", async () => {
    const { reviewLogic } = buildReviewLogicFake();

    const reviewInfo = makeReviewFake();
    await reviewLogic.addReviews([reviewInfo]);
    const before = await reviewLogic.getReviews({
      authorId: reviewInfo.authorId,
    });
    await reviewLogic.removeReviews(before);
    const after = await reviewLogic.getReviews({
      authorId: reviewInfo.authorId,
    });
    expect(before).toHaveLength(1);
    expect(after).toHaveLength(0);
  });
  it("edits review", async () => {
    const { reviewLogic } = buildReviewLogicFake();

    const [
      { content: contentBefore, ...before },
    ] = await reviewLogic.addReviews([makeReviewFake({ content: "good" })]);
    const { content: contentAfter, ...after } = await reviewLogic.editReview({
      ...before,
      content: "bad",
    });
    expect(after).toMatchObject(before);
    expect(contentAfter).not.toEqual(contentBefore);
  });

  it("casts uses most recent vote", async () => {
    const { reviewLogic } = buildReviewLogicFake();
    const user = makeUserFake();

    const review = await reviewLogic.addReview(makeReviewFake());

    const before = await reviewLogic.unitOfWork.ReviewVotes.find({
      reviewId: review.id,
      userId: user.id,
    });

    for (const voteValue of [
      ReviewVoteValue.UP,
      ReviewVoteValue.DOWN,
      ReviewVoteValue.UP,
    ]) {
      await reviewLogic.castReviewVote({
        reviewId: review.id,
        userId: user.id,
        voteValue,
      });
    }

    const after = await reviewLogic.unitOfWork.ReviewVotes.find({
      reviewId: review.id,
      userId: user.id,
    });
    expect(before).toHaveLength(0);
    expect(after).toHaveLength(1);
  });

  it("get aggergated review", async () => {
    const { reviewLogic } = buildReviewLogicFake();
    const user = makeUserFake();
    const review = await reviewLogic.addReview(makeReviewFake());

    for (const voteValue of [
      ReviewVoteValue.UP,
      ReviewVoteValue.DOWN,
      ReviewVoteValue.UP,
    ]) {
      await reviewLogic.castReviewVote({
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
