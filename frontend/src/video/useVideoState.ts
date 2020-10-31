import { useDispatch, useSelector } from "react-redux";
import { video } from "./redux/video";
import { bindActionCreators } from "redux";

export default () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(video.actions, dispatch);
  const slice = useSelector(video.selectors.slice);
  return {
    ...slice,
    ...actions,
  };
};
