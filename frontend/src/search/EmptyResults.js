import React from "react";
import { useSelector } from "react-redux";
import RecentlyViewedHeader from "../common/RecentlyViewedHeader";
import recentlyViewed from "../common/redux/recentlyViewed";
import PopularEntities from "./PopularEntities";
import RecentlySearchHeader from "./RecentlySearchHeader";
import search from "./redux";
import ResultGrid from "./ResultGrid";

export default () => {
  const recentlySearchedEntities = useSelector(
    search.selectors.recentlySearched
  );
  const recentlyViewedEntities = useSelector(recentlyViewed.selectors.entities);

  return (
    <div>
      {recentlySearchedEntities.length > 0 && (
        <div>
          <RecentlySearchHeader />
          <ResultGrid results={recentlySearchedEntities} />
        </div>
      )}
      {recentlyViewedEntities.length > 0 && (
        <div>
          <RecentlyViewedHeader />
          <ResultGrid results={recentlyViewedEntities} />
        </div>
      )}
      <PopularEntities />
    </div>
  );
};
