import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import { Review, ReviewVote, ReviewVoteValue } from "./types";

/*


*/

export type PostReviewParams = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
  content: string;
  title: string;
  rating: number;
};

export const postReview = async (params: PostReviewParams) => {
  const { data } = await BackendAPI.post<Review>("/api/reviews", params);
  return data;
};

/* 


*/

export type PatchReviewParams = {
  reviewId: string;
  content: string;
};

export const patchReview = async ({ content, reviewId }: PatchReviewParams) => {
  const { data } = await BackendAPI.post<Review>(`/api/reviews/${reviewId}`, {
    data: {
      content,
    },
  });
  return data;
};

/* 


*/

export type DeleteReviewParams = {
  reviewId: string;
};

export const deleteReview = async ({ reviewId }: DeleteReviewParams) => {
  const { data } = await BackendAPI.delete<{}>(`/api/reviews/${reviewId}`);
  return data;
};

/* 


*/

export type PostReviewVoteParams = {
  reviewId: string;
  voteValue: ReviewVoteValue;
};

export const postReviewVote = async ({
  reviewId,
  voteValue,
}: PostReviewVoteParams) => {
  const { data } = await BackendAPI.post<ReviewVote>(
    `/api/reviews/${reviewId}/review-votes`,
    {
      data: {
        voteValue,
      },
    }
  );
  return data;
};

/* 


*/

export type DeleteReviewVoteParams = {
  reviewId: string;
};

export const deleteReviewVote = async ({
  reviewId,
}: DeleteReviewVoteParams) => {
  const { data } = await BackendAPI.delete<{}>(
    `/api/reviews/${reviewId}/review-votes`
  );
  return data;
};
