import { AxiosRequestConfig } from "axios";
import * as R from "ramda";
import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";
import { EntityTagType, Tag } from "../types";

type ParamKey = "withPeople" | "withKeywords" | "withGenres" | "withCompanies";

type Params = {
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
} & {
  [key in ParamKey]: string[];
};

const entityTagTypeToParamKey: { [key: string]: ParamKey } = {
  person: "withPeople",
  keyword: "withKeywords",
  genre: "withGenres",
  company: "withCompanies",
};

const tagsToParams = (tags: Tag[]) => {
  const params: Params = {
    withPeople: [],
    withKeywords: [],
    withGenres: [],
    withCompanies: [],
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  };

  for (const tag of tags) {
    if (tag.type === "dateRange") {
      const range = tag.range;

      const gte = R.apply(Math.min, range);
      params["primary_release_date.gte"] = `${gte}-01-01`;

      const lte = R.apply(Math.max, range);
      params["primary_release_date.lte"] = `${lte}-12-31`;
    } else {
      params[entityTagTypeToParamKey[tag.type]].push(tag.id.toString());
    }
  }

  return params;
};

const getDiscoverMovie = async (config: AxiosRequestConfig) => {
  const response = await backendAPI.get("/api/tmdb/discover/movie", config);
  return response.data;
};

export default function* () {
  yield takeLeading(actions.requestDiscover, function* () {
    const tags = yield select(selectors.activeTags);
    const currentPage = yield select(selectors.currentPage);
    const config = {
      params: {
        ...tagsToParams(tags),
        page: currentPage + 1,
      },
    };
    yield put(actions.setStatus("loading"));
    const response = yield call(getDiscoverMovie, config);
    yield put(actions.setStatus("success"));
    const responses = yield select(selectors.responses);
    yield put(actions.setResponses(R.append(response, responses)));
  });

  yield takeEvery(actions.setActiveTags, function* () {
    yield put(actions.setResponses([]));
    yield put(actions.requestDiscover());
  });
}
