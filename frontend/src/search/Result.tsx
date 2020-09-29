import React from "react";
import { Movie, Person } from "../tmdb/types";
import { Result } from "./redux/types";
import ResultMovie from "./ResultMovie";
import ResultPerson from "./ResultPerson";

export default ({ result }: { result: Result }) => {
  switch (result.mediaType) {
    case "movie":
      return <ResultMovie movie={result as Movie} />;
    case "person":
      return <ResultPerson person={result as Person} />;
    default:
      return null;
  }
};
