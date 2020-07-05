import { useQuery } from "react-query";
import TMDB from "../api/tmdb";
import * as R from "ramda";

const rangeStep = (start, step, end) =>
  R.unfold((n) => (n > end ? false : [n, n + step]), start);

const dateRangeOptions = R.map(
  (year) => ({
    type: "dateRange",
    year,
    range: [year, year + 9],
    name: `${year}s`,
    id: year,
  }),
  rangeStep(1880, 10, new Date().getFullYear())
);

const sortKeyToSortByName = {
  "popularity.asc": "Least Popular",
  "popularity.desc": "Most Popular",

  "revenue.asc": "Lowest Revenue",
  "revenue.desc": "Highest Revenue",
  "release_date.asc": "Oldest",
  "release_date.desc": "Newest",
  "primary_release_date.asc": "Oldest",
  "primary_release_date.desc": "Newest",
  "original_title.asc": "A-Z",
  "original_title.desc": "Z-A",
  "vote_average.asc": "Lowest Rated",
  "vote_average.desc": "Highest Rated",
  "vote_count.asc": "Least Popular",
  "vote_count.desc": "Most Popular",
};

const sortKeys = [
  "popularity.asc",
  "popularity.desc",
  "release_date.asc",
  "release_date.desc",
  "revenue.asc",
  "revenue.desc",
  "primary_release_date.asc",
  "primary_release_date.desc",
  "original_title.asc",
  "original_title.desc",
  "vote_average.asc",
  "vote_average.desc",
  "vote_count.asc",
  "vote_count.desc",
];

const sortByOptions = R.map(
  (sortKey) => ({
    type: "sortBy",
    sortKey,
    name: R.prop(sortKey, sortKeyToSortByName),
    id: sortKey,
  }),
  sortKeys
);

export default (text) => {
  const genresQuery = useQuery(["genres"], () => TMDB.genre.movie.list(), {});

  const params = {
    query: text,
  };
  const personSearchQuery = useQuery(
    ["person", "search", text],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const companySearchQuery = useQuery(
    ["company", "search", text],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const keywordSearchQuery = useQuery(
    ["keyword", "search", text],
    () => Promise.resolve({ results: [] }),
    {}
  );

  const movieSearchQuery = useQuery(
    ["movie", "search", text],
    () => Promise.resolve({ results: [] }), //TMDB.search.movie(params),
    {}
  );

  const inputOptionByType = {
    sortBy: sortByOptions,
    dateRange: dateRangeOptions,
    genre: R.pathOr([], ["data", "genres"], genresQuery),
    person: R.pathOr([], ["data", "results"], personSearchQuery),
    company: R.pathOr([], ["data", "results"], companySearchQuery),
    keyword: R.pathOr([], ["data", "results"], keywordSearchQuery),
    movie: R.pipe(
      R.pathOr([], ["data", "results"]),
      R.map((movie) => R.assoc("name", movie.title, movie))
    )(movieSearchQuery),
  };

  const inputOptions = R.pipe(
    R.toPairs,
    R.chain(([type, inputOptions]) =>
      R.map(R.assoc("type", type), inputOptions)
    )
  )(inputOptionByType);

  return inputOptions;
};
