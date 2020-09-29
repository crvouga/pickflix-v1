import * as R from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import RecentlyViewedHeader from "../common/RecentlyViewedHeader";
import { selectors } from "../redux";
import RecentlySearchHeader from "./RecentlySearchHeader";
import ResultGrid from "./ResultGrid";

export default () => {
  const searchHistory = useSelector(selectors.search.recentlySearched);
  const viewHistory = useSelector(selectors.recentlyViewed.entities);
  const isTextEmpty = useSelector(selectors.search.isTextEmpty);

  if (!isTextEmpty) {
    return null;
  }
  return (
    <div>
      {searchHistory.length > 0 && (
        <div>
          <RecentlySearchHeader />
          <ResultGrid results={R.take(30, searchHistory)} />
        </div>
      )}
      {viewHistory.length > 0 && (
        <div>
          <RecentlyViewedHeader />
          <ResultGrid results={R.take(30, viewHistory)} />
        </div>
      )}
    </div>
  );
};
