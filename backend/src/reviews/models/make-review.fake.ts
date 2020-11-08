import { makeId } from "../../id";
import { TmdbMediaType } from "../../media/models/types";
import { UserId } from "../../users/models/make-user";
import { makeReview, Review } from "./make-review";

export const makeReviewFake = (overrides?: Partial<Review>) => {
  return makeReview({
    rating: 4,
    authorId: makeId() as UserId,
    title: "Cool Movie",
    content: "cool movie",
    tmdbMediaId: 550,
    tmdbMediaType: TmdbMediaType.movie,
    ...overrides,
  });
};
