import { descend } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { IDiscoverTag } from "../query/types";
import {
  discoverActiveTags,
  useDiscoverActiveTagsState,
} from "./discover-active-tags";
import { discoverTags, useDiscoverTagsState } from "./discover-tags";

export default () => {
  const activeTagState = useDiscoverActiveTagsState();
  const tagState = useDiscoverTagsState();

  const setActiveTagsById = (tagsById: { [id: string]: IDiscoverTag }) => {
    const activeTagsById = Object.entries(tagsById).reduce(
      (byId, [id, tag]) => ({
        ...byId,
        [id]: {
          ...tag,
          lastActiveAt: Date.now(),
        },
      }),
      {}
    );

    activeTagState.setActiveTagsById(activeTagsById);

    tagState.setTagsById({
      ...tagState.tagsById,
      ...activeTagsById,
    });
  };

  const activateTag = (tag: IDiscoverTag) => {
    const activeTagsById = {
      ...activeTagState.present.activeTagsById,
      [tag.id]: tag,
    };
    setActiveTagsById(activeTagsById);
  };

  const deactivateTag = (tag: IDiscoverTag) => {
    const {
      [tag.id]: _,
      ...activeTagsById
    } = activeTagState.present.activeTagsById;
    setActiveTagsById(activeTagsById);
  };

  const clear = () => {
    setActiveTagsById({});
  };

  const activeTags = Object.values(activeTagState.present.activeTagsById);

  const nonActiveTags = Object.values(tagState.tagsById).filter(
    (tag) => !(tag.id in activeTagState.present.activeTagsById)
  );

  nonActiveTags.sort(descend((tag) => tag.lastActiveAt || 0));

  return {
    activateTag,
    deactivateTag,
    clear,
    nonActiveTags,
    activeTags,
    setActiveTagsById,
    activeTagState,
    tagState,
  };
};
