import { makeId } from "../../id";
import { makeMediaIdFake } from "../../media/models/types";
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
        mediaId: makeMediaIdFake({ tmdbMediaId: n }),
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
    const { reviewLogic } = buildReviewLogicFake();

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
    const { reviewLogic } = buildReviewLogicFake();
    const reviewInfo = makeReviewFake();
    const [added] = await reviewLogic.addReviews([reviewInfo]);
    const [found] = await reviewLogic.unitOfWork.Reviews.find({
      id: added.id,
    });
    expect(found).toMatchObject(added);
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
