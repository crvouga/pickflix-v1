import { MediaLogic } from "../../media/logic/build";
import { TmdbMediaId, TmdbMediaType } from "../../media/models/types";
import { IUnitOfWork } from "../../unit-of-work/types";
import { UserId } from "../../users/models/make-user";
import {
  makeReview,
  MAX_RATING,
  MIN_RATING,
  PartialReview,
  ReviewId,
  RATINGS,
} from "../models/make-review";
import { makeReviewVote, PartialReviewVote } from "../models/make-review-vote";

export class ReviewLogic {
  mediaLogic: MediaLogic;
  unitOfWork: IUnitOfWork;

  constructor({
    unitOfWork,
    mediaLogic,
  }: {
    unitOfWork: IUnitOfWork;
    mediaLogic: MediaLogic;
  }) {
    this.unitOfWork = unitOfWork;
    this.mediaLogic = mediaLogic;
  }

  async getReviews(
    reviewInfo:
      | { authorId: UserId }
      | { tmdbMediaId: TmdbMediaId; tmdbMediaType: TmdbMediaType }
  ) {
    return await this.unitOfWork.Reviews.find(reviewInfo);
  }

  async getAggregation({
    userId,
    reviewId,
  }: {
    userId?: UserId;
    reviewId: ReviewId;
  }) {
    const { Users, ReviewVotes, Reviews } = this.unitOfWork;

    const [[review], [reviewVote], reviewVoteCount] = await Promise.all([
      Reviews.get([reviewId]),
      ReviewVotes.find({
        reviewId,
        userId,
      }),
      ReviewVotes.count({
        reviewId,
      }),
    ]);

    if (!review) {
      throw new Error("Review does not exists.");
    }

    const [
      [author],
      authorReviewCount,
      mediaReviewCount,
      tmdbData,
    ] = await Promise.all([
      Users.find({ id: review.authorId }),
      Reviews.count({ authorId: review.authorId }),
      Reviews.count({
        tmdbMediaType: review.tmdbMediaType,
        tmdbMediaId: review.tmdbMediaId,
      }),
      this.mediaLogic.requestTmdbData({
        path: `/${review.tmdbMediaType}/${review.tmdbMediaId}`,
      }),
    ]);

    return {
      review,
      reviewVoteValue: reviewVote?.voteValue || null,
      reviewVoteCount,
      author,
      authorReviewCount,
      mediaReviewCount,
      tmdbData,
    };
  }

  async getAllAggergations({
    userId,
    ...reviewInfo
  }: {
    userId?: UserId;
  } & (
    | {
        tmdbMediaId: TmdbMediaId;
        tmdbMediaType: TmdbMediaType;
      }
    | { authorId: UserId }
  )) {
    const { Reviews } = this.unitOfWork;

    const found = await Reviews.find(reviewInfo);

    const aggergations = await Promise.all(
      found.map((review) =>
        this.getAggregation({
          reviewId: review.id,
          userId,
        })
      )
    );

    return aggergations;
  }

  async addReview(partialReview: PartialReview) {
    const { Reviews } = this.unitOfWork;

    const review = makeReview(partialReview);

    const found = await Reviews.find({
      authorId: review.authorId,
      tmdbMediaId: review.tmdbMediaId,
      tmdbMediaType: review.tmdbMediaType,
    });

    if (found.length > 0) {
      throw new Error("A user can only have one review per media");
    }

    const [added] = await Reviews.add([review]);

    return added;
  }

  async addReviews(partialReviews: PartialReview[]) {
    const added = [];
    for (const partialReview of partialReviews) {
      added.push(await this.addReview(partialReview));
    }
    return added;
  }

  async removeReviews(reviewInfos: { id: ReviewId }[]) {
    const { Reviews } = this.unitOfWork;
    await Reviews.remove(reviewInfos);
  }

  async editReview(reviewInfo: {
    id: ReviewId;
    authorId: UserId;
    content: string;
  }) {
    const { Reviews } = this.unitOfWork;
    const { id, authorId, ...edits } = reviewInfo;

    const [existing] = await Reviews.find({ id, authorId });
    if (!existing) {
      throw new Error("Can't edit a review that doesn't exists.");
    }
    const edited = makeReview({ ...existing, ...edits });
    await Reviews.update([edited]);
    return edited;
  }

  async castReviewVote(partialReviewVote: PartialReviewVote) {
    const { Reviews, ReviewVotes } = this.unitOfWork;

    const reviewVote = makeReviewVote(partialReviewVote);

    const [existingReview] = await Reviews.find({ id: reviewVote.reviewId });
    if (!existingReview) {
      throw new Error("Can't vote on a review that doesn't exists.");
    }

    //ensure one vote per user per review
    const found = await ReviewVotes.find({
      reviewId: reviewVote.reviewId,
      userId: reviewVote.userId,
    });
    await ReviewVotes.remove(found);

    const [added] = await ReviewVotes.add([reviewVote]);

    return added;
  }

  async uncastReviewVote({
    userId,
    reviewId,
  }: {
    userId: UserId;
    reviewId: ReviewId;
  }) {
    const { ReviewVotes } = this.unitOfWork;
    const [found] = await ReviewVotes.find({ userId, reviewId });
    if (!found) {
      throw new Error("Can't remove review vote that doesn't exists.");
    }
    await ReviewVotes.remove([found]);
  }

  async getRatingFrequency({
    tmdbMediaId,
    tmdbMediaType,
  }: {
    tmdbMediaId: TmdbMediaId;
    tmdbMediaType: TmdbMediaType;
  }) {
    const { Reviews } = this.unitOfWork;

    const ratingFrequency: {
      [rating: number]: number;
    } = {};

    for (const rating of RATINGS) {
      ratingFrequency[rating] = await Reviews.count({
        rating,
        tmdbMediaId,
        tmdbMediaType,
      });
    }

    const ratingCount = await Reviews.count({
      tmdbMediaId,
      tmdbMediaType,
    });

    const ratingAverage =
      Object.entries(ratingFrequency)
        .map(([rating, frequency]) => Number(rating) * frequency)
        .reduce((a, b) => a + b, 0) / Math.max(ratingCount, 1);

    return {
      ratingCount,
      ratingFrequency,
      ratingAverage,
    };
  }
}
