import { makeId } from "../../common/id";
import { makeMediaIdFake } from "../../media/models/types";
import { UserId } from "../../users/models/make-user";
import { makeReview, Review } from "./make-review";

export const makeReviewFake = (overrides?: Partial<Review>) => {
  return makeReview({
    rating: 4,
    authorId: makeId() as UserId,

    content: "cool movie",
    mediaId: makeMediaIdFake(),
    ...overrides,
  });
};
