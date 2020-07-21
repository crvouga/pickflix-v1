import React from "react";
import TMDbAttribution from "../../tmdb/TMDbAttribution";
import PageHistory from "./PageHistory";

export default () => {
  return (
    <React.Fragment>
      <PageHistory />
      <TMDbAttribution />
    </React.Fragment>
  );
};
