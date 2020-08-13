import React from "react";
import ResultMovie from "./ResultMovie";
import ResultPerson from "./ResultPerson";

export default ({ result }) => {
  switch (result.mediaType) {
    case "movie":
      return <ResultMovie movie={result} />;
    case "person":
      return <ResultPerson person={result} />;
    default:
      return null;
  }
};
