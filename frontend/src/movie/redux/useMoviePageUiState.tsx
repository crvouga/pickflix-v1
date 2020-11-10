import { useDispatch, useSelector } from "react-redux";
import { moviePageUi } from "./movie-page-ui";
import { bindActionCreators } from "redux";

export default () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(moviePageUi.actions, dispatch);
  const slice = useSelector(moviePageUi.selectors.slice);
  const toggleIsVideoPlayerSticky = () => {
    actions.setIsVideoPlayerSticky(!slice.isVideoPlayerSticky);
  };
  return {
    ...actions,
    ...slice,
    toggleIsVideoPlayerSticky,
  };
};
