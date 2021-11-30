import * as R from "remeda";
import { IDiscoverTag, UNIQUE_TAG_TYPES } from "../query/types";
import { useDiscoverActiveTagsState } from "./discover-active-tags";
import { useDiscoverTagsState } from "./discover-tags";

export default () => {
  const activeTagState = useDiscoverActiveTagsState();
  const tagState = useDiscoverTagsState();

  const setActiveTagsById = (tagsById: { [id: string]: IDiscoverTag }) => {
    const newActiveTagsById = Object.entries(tagsById).reduce(
      (byId, [id, tag]) => ({
        ...byId,
        [id]: {
          ...tag,
          lastActiveAt: Date.now(),
        },
      }),
      {}
    );

    activeTagState.setActiveTagsById(newActiveTagsById);

    tagState.setTagsById({
      ...tagState.tagsById,
      ...newActiveTagsById,
    });
  };

  const activateTag = (newActiveTag: IDiscoverTag) => {
    const activeTagsById = activeTagState.present.activeTagsById;

    const byId: { [id: string]: IDiscoverTag } = {};

    for (const [id, activeTag] of Object.entries(activeTagsById)) {
      if (
        activeTag.type === newActiveTag.type &&
        newActiveTag.type in UNIQUE_TAG_TYPES
      ) {
        continue;
      }

      byId[id] = activeTag;
    }

    byId[newActiveTag.id] = newActiveTag;

    setActiveTagsById(byId);
  };

  const deactivateTag = (tag: IDiscoverTag) => {
    setActiveTagsById(R.omit(activeTagState.present.activeTagsById, [tag.id]));
  };

  const clear = () => {
    setActiveTagsById({});
  };

  const activeTags = Object.values(activeTagState.present.activeTagsById);

  const nonActiveTags = Object.values(tagState.tagsById).filter(
    (tag) => !(tag.id in activeTagState.present.activeTagsById)
  );

  nonActiveTags.sort((a, b) => (b.lastActiveAt ?? 0) - (a.lastActiveAt ?? 0));

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
