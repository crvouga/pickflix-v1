import { MediaLogic } from "../../media/logic/build";
import { MediaId } from "../../media/models/types";
import {
  IUnitOfWork,
  PaginationOptions,
} from "../../common/unit-of-work/types";
import { UserId } from "../../users/models/make-user";
import {
  makeReview,
  PartialReview,
  RATINGS,
  ReviewId,
  updateReview,
} from "../models/make-review";
import {
  makeReviewVote,
  PartialReviewVote,
  ReviewVoteValue,
} from "../models/make-review-vote";
import { removeNullOrUndefinedEntries } from "../../common/utils";

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

  async createOrUpdateReview({
    authorId,
    mediaId,
    rating,
    content,
  }: {
    authorId: UserId;
    mediaId: MediaId;
    rating: number;
    content?: string;
  }) {
    const { Reviews } = this.unitOfWork;

    const [found] = await Reviews.find({
      authorId,
      mediaId,
    });

    if (found) {
      const updated = await Reviews.update(
        updateReview(found, {
          rating,
          content,
        })
      );
      return updated;
    }

    const [added] = await Reviews.add([
      makeReview({
        authorId,
        mediaId,
        rating,
        content,
      }),
    ]);

    return added;
  }

  async getReviews(reviewInfo: { authorId: UserId } | { mediaId: MediaId }) {
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

    const [
      [review],
      [reviewVote],
      reviewVoteCount,
      reviewUpVoteCount,
    ] = await Promise.all([
      Reviews.find({
        id: reviewId,
      }),
      ReviewVotes.find({
        reviewId,
        userId,
      }),
      ReviewVotes.count({
        reviewId,
      }),
      ReviewVotes.count({
        reviewId,
        voteValue: ReviewVoteValue.UP,
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
        mediaId: review.mediaId,
      }),
      this.mediaLogic.requestTmdbData({
        mediaId: review.mediaId,
      }),
    ]);

    return {
      review,
      reviewVoteCount,
      reviewUpVoteCount,
      author,
      authorReviewCount,
      mediaReviewCount,
      tmdbData,
      reviewVoteValue: reviewVote?.voteValue || null,
    };
  }

  async getAllAggergations(
    {
      userId,
      ...reviewInfo
    }: {
      userId?: UserId;
      authorId?: UserId;
      mediaId?: MediaId;
    },
    pagination?: PaginationOptions
  ) {
    const { Reviews } = this.unitOfWork;

    const found = await Reviews.find(removeNullOrUndefinedEntries(reviewInfo), {
      orderBy: [["updatedAt", "descend"]],
      pagination,
    });

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
      mediaId: review.mediaId,
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

  async editReview({
    id,
    authorId,
    ...edits
  }: {
    id: ReviewId;
    authorId: UserId;
    rating?: number;
    content?: string;
  }) {
    const { Reviews } = this.unitOfWork;

    const [existing] = await Reviews.find({ id, authorId });

    if (!existing) {
      throw new Error("Can't edit a review that doesn't exists.");
    }

    const updated = await Reviews.update(updateReview(existing, edits));

    return updated;
  }

  async castReviewVote(partialReviewVote: PartialReviewVote) {
    const { Reviews, ReviewVotes } = this.unitOfWork;

    const reviewVote = makeReviewVote(partialReviewVote);

    const [existingReview] = await Reviews.find({ id: reviewVote.reviewId });
    if (!existingReview) {
      throw new Error("Can't vote on a review that doesn't exists.");
    }

    //ensure one vote per user per review
    const [found] = await ReviewVotes.find({
      reviewId: reviewVote.reviewId,
      userId: reviewVote.userId,
    });
    if (found) {
      const updated = await ReviewVotes.update({
        id: found.id,
        voteValue: reviewVote.voteValue,
      });
      return updated;
    } else {
      const [added] = await ReviewVotes.add([reviewVote]);

      return added;
    }
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

  async getRatingFrequency({ mediaId }: { mediaId: MediaId }) {
    const { Reviews } = this.unitOfWork;

    const ratingFrequency: {
      [rating: number]: number;
    } = {};

    for (const rating of RATINGS) {
      ratingFrequency[rating] = await Reviews.count({
        rating,
        mediaId,
      });
    }

    const ratingCount = await Reviews.count({
      mediaId,
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
