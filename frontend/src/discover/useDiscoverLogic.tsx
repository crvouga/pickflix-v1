import { difference } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { DiscoverMovieTag } from "./query/types";
import { discoverActiveTags } from "./redux/discover-active-tags";
import { discoverTags } from "./redux/discover-tags";

export default () => {
  const dispatch = useDispatch();

  const activeTags = useSelector(discoverActiveTags.selectors.activeTags);
  const tags = useSelector(discoverTags.selectors.tags);
  const nonActiveTags = difference(tags, activeTags);

  const activateTag = (tag: DiscoverMovieTag) =>
    dispatch(discoverActiveTags.actions.activate(tag));
  const deactivateTag = (tag: DiscoverMovieTag) =>
    dispatch(discoverActiveTags.actions.deactivate(tag));
  const undo = () => dispatch(discoverActiveTags.actions.undo());
  const redo = () => dispatch(discoverActiveTags.actions.redo());
  const clear = () => dispatch(discoverActiveTags.actions.setActiveTags([]));

  return {
    activeTags,
    nonActiveTags,
    tags,
    activateTag,
    deactivateTag,
    clear,
    undo,
    redo,
  };
};
