import { PaginationOptions } from "../../common/pagination";
import { removeNullOrUndefinedEntries } from "../../common/utils";
import { MediaLogic } from "../../media/logic/logic";
import { MediaId } from "../../media/models/types";
import { UserId } from "../../users/models/make-user";
import { IUserRepository } from "../../users/repositories/user-repository";
import {
  makeReview,
  PartialReview,
  RATINGS,
  ReviewId,
  updateReview,
} from "../models/make-review";
import { makeReviewVote, ReviewVoteValue } from "../models/make-review-vote";
import { IReviewRepository } from "../repositories/review-repository";
import { IReviewVoteRepository } from "../repositories/review-vote-repository";

export class ReviewLogic {
  reviewRepository: IReviewRepository;
  reviewVoteRepository: IReviewVoteRepository;
  userRepository: IUserRepository;
  mediaLogic: MediaLogic;

  constructor({
    mediaLogic,
    userRepository,
    reviewRepository,
    reviewVoteRepository,
  }: {
    mediaLogic: MediaLogic;
    userRepository: IUserRepository;
    reviewRepository: IReviewRepository;
    reviewVoteRepository: IReviewVoteRepository;
  }) {
    this.userRepository = userRepository;
    this.mediaLogic = mediaLogic;
    this.reviewRepository = reviewRepository;
    this.reviewVoteRepository = reviewVoteRepository;
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
    const [found] = await this.reviewRepository.find({
      authorId,
      mediaId,
    });

    if (found) {
      const updated = updateReview(found, {
        rating,
        content,
      });
      await this.reviewRepository.update(updated.id, updated);

      return updated;
    }

    const created = makeReview({
      authorId,
      mediaId,
      rating,
      content,
    });

    await this.reviewRepository.add(created);

    return created;
  }

  async getReviews(spec: { authorId: UserId } | { mediaId: MediaId }) {
    return await this.reviewRepository.find(spec);
  }

  async getAggregation({
    userId,
    reviewId,
  }: {
    userId?: UserId;
    reviewId: ReviewId;
  }) {
    const [
      [review],
      [reviewVote],
      reviewVoteCount,
      reviewUpVoteCount,
    ] = await Promise.all([
      this.reviewRepository.find({
        id: reviewId,
      }),
      this.reviewVoteRepository.find({
        reviewId,
        userId,
      }),
      this.reviewVoteRepository.count({
        reviewId,
      }),
      this.reviewVoteRepository.count({
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
      this.userRepository.find([{ id: review.authorId }]),
      this.reviewRepository.count({ authorId: review.authorId }),
      this.reviewRepository.count({
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
      id?: ReviewId;
      userId?: UserId;
      authorId?: UserId;
      mediaId?: MediaId;
    },
    pagination?: PaginationOptions,
  ) {
    const found = await this.reviewRepository.find(
      removeNullOrUndefinedEntries(reviewInfo),
      {
        orderBy: [["updatedAt", "descend"]],
        pagination,
      },
    );

    const aggergations = await Promise.all(
      found.map((review) =>
        this.getAggregation({
          reviewId: review.id,
          userId,
        })
      ),
    );

    return aggergations;
  }

  async addReview(partialReview: PartialReview) {
    const found = await this.reviewRepository.find({
      authorId: partialReview.authorId,
      mediaId: partialReview.mediaId,
    });

    if (found.length > 0) {
      throw new Error("A user can only have one review per media");
    }

    const created = makeReview(partialReview);

    await this.reviewRepository.add(created);

    return created;
  }

  async addReviews(partialReviews: PartialReview[]) {
    const added = [];
    for (const partialReview of partialReviews) {
      added.push(await this.addReview(partialReview));
    }
    return added;
  }

  async removeReviews(id: ReviewId) {
    await this.reviewRepository.remove(id);
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
    const [existing] = await this.reviewRepository.find({ id, authorId });

    if (!existing) {
      throw new Error("Can't edit a review that doesn't exists.");
    }

    const updated = updateReview(existing, edits);

    await this.reviewRepository.update(updated.id, updated);

    return updated;
  }

  async setReviewVote({
    voteValue,
    userId,
    reviewId,
  }: {
    voteValue: ReviewVoteValue | null;
    userId: UserId;
    reviewId: ReviewId;
  }) {
    const [review] = await this.reviewRepository.find({
      id: reviewId,
    });

    if (!review) {
      throw new Error("Can't vote on review that does not exists");
    }

    const [reviewVote] = await this.reviewVoteRepository.find({
      reviewId: reviewId,
      userId: userId,
    });

    if (reviewVote && voteValue === null) {
      await this.reviewVoteRepository.remove(reviewVote.id);
      return false;
    }

    if (reviewVote && voteValue !== null) {
      await this.reviewVoteRepository.update(reviewVote.id, {
        voteValue: voteValue,
      });
      return true;
    }

    if (!reviewVote && voteValue !== null) {
      const reviewVote = makeReviewVote({
        reviewId,
        userId,
        voteValue,
      });
      await this.reviewVoteRepository.add(reviewVote);
      return true;
    }

    return false;
  }

  async getRatingFrequency({ mediaId }: { mediaId: MediaId }) {
    const ratingFrequency: {
      [rating: number]: number;
    } = {};

    for (const rating of RATINGS) {
      ratingFrequency[rating] = await this.reviewRepository.count({
        rating,
        mediaId,
      });
    }

    const ratingCount = await this.reviewRepository.count({
      mediaId,
    });

    const ratingAverage = Object.entries(ratingFrequency)
      .map(([rating, frequency]) => Number(rating) * frequency)
      .reduce((a, b) => a + b, 0) / Math.max(ratingCount, 1);

    return {
      ratingCount,
      ratingFrequency,
      ratingAverage,
    };
  }
}
