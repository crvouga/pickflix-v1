import {TmdbMediaType} from '../../media/models/types';
import {IUnitOfWork} from '../../unit-of-work/types';
import {UserId} from '../../users/models/types';
import {makeReview, PartialReview, ReviewId} from '../models/make-review';
import {makeReviewVote, PartialReviewVote} from '../models/make-review-vote';

export class ReviewLogic {
  unitOfWork: IUnitOfWork;

  constructor({unitOfWork}: {unitOfWork: IUnitOfWork}) {
    this.unitOfWork = unitOfWork;
  }

  async getReviews(
    reviewInfo:
      | {authorId: UserId}
      | {tmdbMediaId: string; tmdbMediaType: TmdbMediaType}
  ) {
    const {Reviews} = this.unitOfWork;

    const reviews = await Reviews.find(reviewInfo);

    return reviews;
  }

  async getReviewAggergation({
    userId,
    reviewId,
  }: {
    userId?: UserId;
    reviewId: ReviewId;
  }) {
    const {Reviews, ReviewVotes} = this.unitOfWork;

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

    return {
      review,
      reviewVoteValue: reviewVote?.voteValue || undefined,
      reviewVoteCount,
    };
  }

  async getReviewAggergations({
    tmdbMediaId,
    tmdbMediaType,
    userId,
  }: {
    userId?: UserId;
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }) {
    const foundReviews = await this.unitOfWork.Reviews.find({
      tmdbMediaId,
      tmdbMediaType,
    });
    const aggergations = await Promise.all(
      foundReviews.map(review =>
        this.getReviewAggergation({reviewId: review.id, userId})
      )
    );
    return aggergations;
  }

  async addReview(partialReview: PartialReview) {
    const {Reviews} = this.unitOfWork;
    const review = makeReview(partialReview);
    const found = await Reviews.find({
      authorId: review.authorId,
      tmdbMediaId: review.tmdbMediaId,
      tmdbMediaType: review.tmdbMediaType,
    });

    if (found.length > 0) {
      throw new Error('A user can only have one review per media');
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

  async removeReviews(reviewInfos: {id: ReviewId}[]) {
    const {Reviews} = this.unitOfWork;
    await Reviews.remove(reviewInfos);
  }

  async editReview(reviewInfo: {
    id: ReviewId;
    authorId: UserId;
    content: string;
  }) {
    const {Reviews} = this.unitOfWork;
    const {id, authorId, ...edits} = reviewInfo;

    const [existing] = await Reviews.find({id, authorId});
    if (!existing) {
      throw new Error("Can't edit a review that doesn't exists.");
    }
    const edited = makeReview({...existing, ...edits});
    await Reviews.update([edited]);
    return edited;
  }

  async castReviewVote(partialReviewVote: PartialReviewVote) {
    const {Reviews, ReviewVotes} = this.unitOfWork;

    const reviewVote = makeReviewVote(partialReviewVote);

    const [existingReview] = await Reviews.find({id: reviewVote.reviewId});
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

  async uncastReviewVote({reviewId}: {reviewId: ReviewId}) {
    const {ReviewVotes} = this.unitOfWork;
    const [found] = await ReviewVotes.find({reviewId});
    if (!found) {
      throw new Error("Can't remove review vote that doesn't exists.");
    }
    await ReviewVotes.remove([found]);
  }
}
