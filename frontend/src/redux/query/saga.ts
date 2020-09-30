import * as R from "ramda";
import {
  actionTypes,
  MutateSuccessAction,
  RequestFailureAction,
} from "redux-query";
import { race, take } from "redux-saga/effects";

const { MUTATE_SUCCESS, MUTATE_FAILURE } = actionTypes;

export function* takeQueryResponse({ url }: { url: string }) {
  const {
    success,
    failure,
  }: {
    success: MutateSuccessAction;
    failure: RequestFailureAction;
  } = yield race({
    success: take(R.whereEq({ type: MUTATE_SUCCESS, url })),
    failure: take(R.whereEq({ type: MUTATE_FAILURE, url })),
  });
  return { success, failure };
}

export default function* saga() {}
