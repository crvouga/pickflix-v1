import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Entity, pageHistory } from "./page-history";

const usePageHistoryState = () => {
  const slice = useSelector(pageHistory.selectors.slice);
  const movies = useSelector(pageHistory.selectors.movies);
  const dispatch = useDispatch();
  const actions = bindActionCreators(pageHistory.actions, dispatch);
  return {
    ...actions,
    ...slice,
    movies,
  };
};

export default () => {
  const pageHistoryState = usePageHistoryState();

  const push = (entity: Entity) => {
    switch (entity.mediaType) {
      case "movie":
        pageHistoryState.push({
          mediaType: "movie",
          title: entity.title,
          posterPath: entity.posterPath,
          id: entity.id,
        });
        break;

      case "person":
        pageHistoryState.push({
          mediaType: "person",
          name: entity.name,
          profilePath: entity.profilePath,
          id: entity.id,
        });
        break;
    }
  };

  return {
    ...pageHistoryState,
    push,
  };
};
