import { useDispatch, useSelector } from "react-redux";
import { moviePageUi, reviewCommentsTabOrder } from "./movie-page-ui";
import { bindActionCreators } from "redux";

export default () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(moviePageUi.actions, dispatch);
  const slice = useSelector(moviePageUi.selectors.slice);

  const toggleIsVideoPlayerSticky = () => {
    actions.setIsVideoPlayerSticky(!slice.isVideoPlayerSticky);
  };

  const reviewCommentsTabIndex = reviewCommentsTabOrder.indexOf(
    slice.reviewCommentsTabValue
  );

  return {
    ...actions,
    ...slice,
    toggleIsVideoPlayerSticky,
    reviewCommentsTabIndex,
    reviewCommentsTabOrder,
  };
};
