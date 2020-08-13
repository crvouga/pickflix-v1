import React from "react";
import { useSelector } from "react-redux";
import RecentlyViewedHeader from "../common/RecentlyViewedHeader";
import recentlyViewed from "../common/redux/recentlyViewed";
import RecentlySearchHeader from "./RecentlySearchHeader";
import search from "./redux";
import ResultGrid from "./ResultGrid";
import * as R from "ramda";

const History = ({ searchHistory, viewHistory }) => {
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

export default () => {
  const searchHistory = useSelector(search.selectors.recentlySearched);
  const viewHistory = useSelector(recentlyViewed.selectors.entities);
  const isTextEmpty = useSelector(search.selectors.isTextEmpty);
  if (isTextEmpty) {
    return <History searchHistory={searchHistory} viewHistory={viewHistory} />;
  } else {
    return null;
  }
};
