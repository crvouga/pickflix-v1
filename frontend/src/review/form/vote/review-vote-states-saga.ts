import { put, takeEvery, call, select, delay } from "redux-saga/effects";
import { reviewVoteStates, voteReducer, VoteState } from "./review-vote-states";
import { postReviewVote } from "../../query";

export function* reviewVoteStatesSaga() {
  yield takeEvery(reviewVoteStates.actions.vote, function* (action) {
    const { review, voteValue } = action.payload;

    const previousVoteState: VoteState = yield select(
      reviewVoteStates.selectors.voteState(review)
    );

    const nextVoteState = voteReducer(previousVoteState, voteValue);

    const reviewId = review.review.id;

    yield put(reviewVoteStates.actions.setVoteState(reviewId, nextVoteState));

    try {
      yield call(postReviewVote, {
        reviewId,
        voteValue: nextVoteState.voteValue,
      });
    } catch (error) {
      yield put(
        reviewVoteStates.actions.setVoteState(reviewId, previousVoteState)
      );
    }
  });
}
