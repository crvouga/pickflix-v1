import React from "react";
import { useSelector } from "react-redux";
import RecentlyViewedHeader from "../common/RecentlyViewedHeader";
import recentlyViewed from "../common/redux/recentlyViewed";
import RecentlySearchHeader from "./RecentlySearchHeader";
import search from "./redux";
import ResultGrid from "./ResultGrid";

export default () => {
  const searchHistory = useSelector(search.selectors.recentlySearched);
  const viewHistory = useSelector(recentlyViewed.selectors.entities);

  return (
    <>
      {searchHistory.length > 0 && (
        <>
          <RecentlySearchHeader />
          <ResultGrid results={searchHistory} />
        </>
      )}
      {viewHistory.length > 0 && (
        <>
          <RecentlyViewedHeader />
          <ResultGrid results={viewHistory} />
        </>
      )}
    </>
  );
};
