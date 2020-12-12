import { makeId } from "../../app/id";
import { makeMediaIdFake } from "../../media/models/types";
import { UserId, castUserId } from "../../users/models/make-user";
import { makeReview, Review } from "./make-review";

export const makeReviewFake = (
  overrides?: { content?: string } | Partial<Review>
) => {
  return makeReview({
    rating: 4,
    authorId: castUserId(makeId()),
    content: "cool movie",
    mediaId: makeMediaIdFake(),
    ...overrides,
  });
};
