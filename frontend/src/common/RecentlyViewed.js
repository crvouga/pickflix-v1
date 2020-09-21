import React from "react";
import { useSelector } from "react-redux";
import HorizontalScroll from "./components/HorizontalScroll";
import MediaEntity from "./MediaEntity";
import RecentlyViewedHeader from "./RecentlyViewedHeader";
import recentlyViewed from "../redux/recentlyViewed";

export default () => {
  const recentlyViewedEntities = useSelector(recentlyViewed.selectors.entities);

  if (recentlyViewedEntities.length === 0) return null;

  return (
    <div>
      <RecentlyViewedHeader />
      <HorizontalScroll paddingLeft={2}>
        {recentlyViewedEntities.map((entity) => (
          <MediaEntity key={entity.id} entity={entity} marginRight={1} />
        ))}
      </HorizontalScroll>
    </div>
  );
};
