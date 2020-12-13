import { difference, union, without } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { IDiscoverMovieTag } from "./query/types";
import { discoverActiveTags } from "./redux/discover-active-tags";
import { discoverTags } from "./redux/discover-tags";

const useDiscoverState = () => {
  const dispatch = useDispatch();
  const activeTagsSlice = useSelector(discoverActiveTags.selectors.slice);
  const tagsSlice = useSelector(discoverTags.selectors.slice);

  return {
    ...activeTagsSlice,
    ...activeTagsSlice.present,
    ...tagsSlice,
    ...bindActionCreators(discoverActiveTags.actions, dispatch),
    ...bindActionCreators(discoverTags.actions, dispatch),
  };
};

export default () => {
  const discoverState = useDiscoverState();

  const nonActiveTags = difference(
    discoverState.tags,
    discoverState.activeTags
  );

  const activateTag = (tag: IDiscoverMovieTag) => {
    discoverState.setActiveTags(union([tag], discoverState.activeTags));
  };

  const deactivateTag = (tag: IDiscoverMovieTag) => {
    discoverState.setActiveTags(without([tag], discoverState.activeTags));
  };

  const clear = () => {
    discoverState.setActiveTags([]);
  };

  return {
    ...discoverState,
    nonActiveTags,
    activateTag,
    deactivateTag,
    clear,
  };
};
