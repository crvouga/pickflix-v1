import { useDispatch, useSelector } from "react-redux";
import { discoverActiveTags } from "./redux/discover-active-tags";
import { discoverTags } from "./redux/discover-tags";
import { difference, union } from "ramda";
import { DiscoverMovieTag, uniqueTagTypes } from "./query/types";

export default () => {
  const dispatch = useDispatch();

  const activeTags = useSelector(discoverActiveTags.selectors.activeTags);
  const tags = useSelector(discoverTags.selectors.tags);
  const nonActiveTags = difference(tags, activeTags);

  const activateTag = (newTag: DiscoverMovieTag) => {
    const isUniqueTag = uniqueTagTypes.includes(newTag.type);
    if (isUniqueTag) {
      const newActiveTags = union(
        activeTags.filter((tag) => tag.type !== newTag.type),
        [newTag]
      );
      dispatch(discoverActiveTags.actions.setActiveTags(newActiveTags));
    } else {
      const newActiveTags = union(activeTags, [newTag]);
      dispatch(discoverActiveTags.actions.setActiveTags(newActiveTags));
    }
  };

  const deactivateTag = (tag: DiscoverMovieTag) => {
    const newActiveTags = difference(activeTags, [tag]);
    dispatch(discoverActiveTags.actions.setActiveTags(newActiveTags));
  };

  return {
    activateTag,
    deactivateTag,

    activeTags,
    nonActiveTags,
    tags,
  };
};
